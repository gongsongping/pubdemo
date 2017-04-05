import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { Districtdetails } from '../districtdetails/districtdetails';
import { Housedetailsedit } from '../housedetailsedit/housedetailsedit';
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

    @ViewChild(Content) content: Content;
    housedetailsedit: any = Housedetailsedit;
    userInfo: any;
    house: any;
    roleName: any;
    enterTyle: any;
    isAction = false;
    houses = [];
    housesHkId = '';
    messagesDetailName = [];
    referrerName = {};
    hkName = [];
    url;
    tradeType:any;
    subdistricts: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        let vm = this;
        vm.house = navParams.get('house')
        vm.tradeType = vm.house.tradeType;
        console.log(vm.tradeType)
        vm.enterTyle = navParams.get('enter');
    }
    scrollToTop() {
        this.content.scrollToTop();
    }
    ionViewDidLoad() {
        // this.doInfinite(false);
        console.log('ionViewDidLoad HousesearchPage');
    }
    ionViewWillEnter() { 
        this.scrollToTop();
        let vm = this;
        vm.roleName = localStorage.getItem('role');
        if (vm.tradeType == '1') {
            vm.url = '/api/housing/houses/' + vm.house.id
        }
        if (vm.tradeType == '2') {
            vm.url = '/api/housing/rent/' + vm.house.id
        }
        axios
            .get(vm.url)
            .then(function (res) {
                vm.houses = res.data;
                console.log(vm.houses)
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
        let url1 = 'api/housing/subdistricts/' + vm.house.subdistrict.id
        axios.get(url1)
            .then(function (res) {
                vm.subdistricts = res.data;
            })
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
    districtDs() {
        this.navCtrl.push(Districtdetails, { subdistricts: this.subdistricts })
    }
    pushEdit(e) {
        this.navCtrl.push(Housedetailsedit, { house: e })
    }
    action() {
        this.isAction = !this.isAction
    }
}

