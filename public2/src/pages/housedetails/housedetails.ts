import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Districtdetails } from '../districtdetails/districtdetails';
import { Visitrecord } from '../visitrecord/visitrecord';
import { Login } from '../login/login';

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

    house: any;
    isAction = false;
    subdistricts:any;
    constructor(public navCtrl: NavController, public Params: NavParams) {
        this.house = this.Params.get('house');
    }

    ionViewDidEnter() {
        // this.doInfinite(false);
        console.log('ionViewDidEnter HousedetailsPage');
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
    }

    userInfo: any;
    tokens: any;
    ionViewWillEnter(){
        let vm = this;
        let url = 'api/housing/subdistricts/' + vm.house.subdistrict.id
        axios.get(url)
            .then(function (res) {
                vm.subdistricts = res.data;
            })
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))    
        this.tokens = JSON.parse(localStorage.getItem('tokens'))    
    }
    ionViewDidLoad() {
        console.log('----housedetails----- Page did load');
    }

    goDistrict(){
        this.navCtrl.push(Districtdetails, { subdistricts: this.subdistricts })
    }
    action () {
        this.isAction = !this.isAction
    }

    //预约看房
    loginOrStartBuyRecommend (){
       let vm = this
       if (vm.tokens){
           vm.startBuyRecommend()
       } else {
           vm.navCtrl.push(Login)
       }
    }
    
    buy_recommend_id
    mission_id
    mission
    startBuyRecommend () {
        // api/activiti/runtime/process-instances
        let vm = this
        let bs64 = window.btoa(vm.userInfo.username + ':' + vm.tokens.access_token)
        axios({
            method: 'get',
            headers: { "Authorization": "Basic " + bs64 },
            url: '/api/activiti/repository/process-definitions?latest=true&key=buy_recommend'
        }).then(function successCallback(res) {
                vm.buy_recommend_id = res.data.data[0].id
                axios({
                    method: 'post',
                    url: '/api/activiti/runtime/process-instances',
                    headers: { "Authorization": "Basic " + bs64 },
                    data: {
                        "processDefinitionId": vm.buy_recommend_id,
                        "variables": [{
                            "name": "creator_id",
                            "type": "long",
                            "value": vm.userInfo.id
                        }, {
                            "name": "region_id",
                            "value": vm.house.regionId//vm.choosedRegion.id
                        }, {
                            "name": "customer_name",
                            "value": vm.userInfo.username //$window.localStorage.user_id
                        }, {
                            "name": "customer_mobile",
                            "value": vm.userInfo.mobile
                        }]
                    }
                }).then(function successCallback(res) {
                        alert('预约成功')
                        vm.navCtrl.push(Visitrecord)                       
                        // vm.navCtrl.pop()
                        // vm.mission_id = res.data.value
                        // axios({
                        //     method: 'get',
                        //     url: '/api/mission/missions/' + vm.mission_id
                        // }).then(function successCallback(res) {
                        //         vm.mission = res.data
                        //         if (vm.mission.watchHouseFee == 0) {
                        //             alert('预约成功,本次看房免费,请确认订单!')
                        //             // vm.knowmodal.hide()
                        //             // vm.goVisitrecord()
                        //             vm.navCtrl.push(Visitrecord)
                        //         } else {
                        //             // vm.paymodal.show();
                        //         }
                        //     })
                    }).catch(function errorCallback() {
                        alert('服务器错误')                
                    })
            }).catch(function() {
                alert('服务器错误')                
            })

    }
  
    //pay alipay
    // $ionicModal.fromTemplateUrl('templates/_datevisitpay.html', {
    //     scope: vm,
    //     animation: 'slide-in-up'
    // }).then(function (modal) {
    //     vm.paymodal = modal;
    // });
    // vm.$on('$destroy', function () {
    //     vm.paymodal.remove();
    // });
    paySuccess () {
        let vm = this
        // vm.knowmodal.hide()
        // vm.paymodal.hide()
        // vm.goVisitrecord()
    }
    payCancel () {
        // vm.knowmodal.hide()
        // vm.paymodal.hide()
    }
    openUrl (url) {
        // console.log('inapp')
        window.open(url, '_system')
    }

    alipay () {
        let vm = this
        //userAgent 0 mobileapp 1 web
        let data = `missionId=${vm.mission_id}&userId=${vm.userInfo.id}&orderNumber=${vm.mission.serialNumber}&userAgent=0`
        axios({
            method: 'post',
            url: '/api/payment/alipay',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        }).then(function successCallback(res) {
                vm.openUrl(res.data)
            }).catch(function() {
                alert('服务器错误')                
            })
    }


}


