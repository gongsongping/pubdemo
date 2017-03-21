import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';
import { Districtdetails } from '../districtdetails/districtdetails';

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

    districtdetails: any = Districtdetails;
    userInfo:any;
    houses: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.houses = navParams.get('house')
    }

    ionViewDidLoad() {
        // this.doInfinite(false);
        console.log('ionViewDidLoad HousesearchPage');
    }

    ionViewWillEnter() {
        // this.roleName = localStorage.getItem('role')
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
    houseDetailsAll() {
        let vm = this;
        vm.houses = [];
        let url = ''
        // if (vm.roleName == '房管家') {
        //     url = '/api/housing/houses?size=10';
        // }
        // if (vm.roleName == '租赁专员') {
        //     url = '/api/housing/rents?size=10';
        // }
        // axios
        //     .get(url + vm.nameLike + vm.priceParams + vm.houseTypeParams + vm.buildingAreaParams + vm.buildYearParams + vm.orientationParams + vm.buildStatusParams + vm.regionParams)
        //     .then(function (res) {
        //         vm.houses = res.data.data;
        //         vm.dataLength = res.data.data.length
        //         if (res.data.total < 10) {
        //             vm.dataLength = 0;
        //         } else {
        //             vm.start = 1;
        //         }
        //     })
        //     .catch(function (error) {
        //         vm.dataLength = 0
        //         alert('服务器错误');
        //         console.log(error);
        //     });
    }
}

