import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Districtdetails } from '../districtdetails/districtdetails';
import axios from 'axios';

/*
  Generated class for the Housedetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-housedetails',
    templateUrl: 'housedetails.html'
})
export class Housedetails {

    userInfo: any;
    house: any;
    roleName: any;
    isAction = false;
    houses = [];
    housesHkId = '';
    messagesDetailName = [];
    referrerName = [];
    hkName = [];
    referrerWu = [];
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // console.log(Params.get('house'))
        // this.house = Params.get('house')
        let vm = this;
        vm.house = navParams.get('house')
        let url = 'api/housing/houses/' + vm.house.id
        axios
            .get(url)
            .then(function (res) {
                vm.houses = res.data;
                axios
                    .get('/api/account/users/' + res.data.supplierId)
                    .then(function (res) {
                        vm.messagesDetailName = res.data;
                    })
                axios
                    .get('/api/account/employees/' + res.data.hkId)
                    .then(function (res) {
                        vm.hkName = res.data;
                    })
                if (!res.data.referrerId) {
                    return vm.referrerWu = ['无'];
                }
                if (res.data.referrerId < 5000000) {
                    let url1 = '/api/account/employees/' + res.data.referrerId
                    axios
                        .get(url1)
                        .then(function (res) {
                            vm.referrerWu = undefined;
                            vm.referrerName = res.data;
                        })
                }
                if (res.data.referrerId > 5000000) {
                    let url2 = '/api/account/users/' + res.data.referrerId
                    axios
                        .get(url2)
                        .then(function (res) {
                            vm.referrerWu = undefined;
                            vm.referrerName = res.data
                        })
                }
            })
    }
    ionViewDidLoad() {
        // this.doInfinite(false);
        console.log('ionViewDidLoad HousesearchPage');
    }
    ionViewWillEnter() {
        this.roleName = localStorage.getItem('role')
    }
    ionViewDidEnter() {
        let vm = this;
        if (localStorage.getItem('userInfo')) {
            vm.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log('-----', vm.userInfo);
            // vm.doInfinite(false);
            // vm.areaList();
        } else {
            vm.userInfo = ''
        }
    }
    districtDs(d) {
        this.navCtrl.push(Districtdetails, { house: d })
    }
    action() {
        this.isAction = !this.isAction
    }
}

