import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Districtdetails } from '../districtdetails/districtdetails';
import axios from 'axios';

declare var BMap: any;

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
    referrerName = {};
    hkName = [];
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
                    return vm.referrerName = {
                        name: "无",
                        mobile: "",
                        department: 
                            {
                                name: "无"
                            }
                    }
                }
                if (res.data.referrerId < 5000000) {
                    let url1 = '/api/account/employees/' + res.data.referrerId
                    axios
                        .get(url1)
                        .then(function (res) {
                            vm.referrerName = res.data;
                        })
                }
                if (res.data.referrerId > 5000000) {
                    let url2 = '/api/account/users/' + res.data.referrerId
                    axios
                        .get(url2)
                        .then(function (res) {
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
        let map = new BMap.Map("housedetails-map");
        if (this.house.subdistrict.longitude) {
            console.log(this.house.subdistrict.longitude, this.house.subdistrict.latitude)
            let point = new BMap.Point(this.house.subdistrict.longitude, this.house.subdistrict.latitude);
            let mk = new BMap.Marker(point);
            map.addOverlay(mk);
            // map.panTo(point);
            map.centerAndZoom(point, 18);
            // mk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        } else {
            map.centerAndZoom("北京", 12);
        }
        map.enableScrollWheelZoom(true);
        let vm = this;
        if (localStorage.getItem('userInfo')) {
            vm.userInfo = JSON.parse(localStorage.getItem('userInfo'));
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

