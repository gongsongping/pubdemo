import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { MyRecommendbuyer } from '../myRecommendbuyer/myRecommendbuyer';

import axios from 'axios';

/*
  Generated class for the Recommendbuyer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-recommendbuyer',
    templateUrl: 'recommendbuyer.html'
})
export class Recommendbuyer {


    choosedDis: any;
    house = { user_name: '', mobile: '', note: '' }
    searchData = { input: '' }
    buy_recommend_id: any;
    searchName = '';
    selections = false;
    searchInput = '';
    userId: any;
    myRecommendbuyer: any = MyRecommendbuyer;
    tokens = JSON.parse(localStorage.getItem('tokens'));
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RecommendbuyerPage');
    }

    ionViewWillEnter() {
        let vm = this
        console.log('Hello PrecisePage Page');
        // '/api/activiti/repository/process-definitions?latest=true&key=buy_recommend'

        var bs64 = window.btoa(vm.userInfo.username + ':' + vm.tokens.access_token)
        axios({
            method: 'get',
            headers: { "Authorization": "Basic " + bs64 },
            url: '/api/activiti/repository/process-definitions?latest=true&key=buy_recommend'
        }).then(function successCallback(res) {
            vm.buy_recommend_id = res.data.data[0].id
            // console.log(vm.buy_recommend_id );
        })
    }
    ionViewDidEnter() {

    }

    serviceInput() { 
        let vm = this
        if (!vm.choosedDis) {
            alert('小区不能为空')
            return
        }
        if (vm.house.user_name) {
            // /api/account/users 
            if (vm.house.user_name == null || vm.house.mobile == null) {
                // return vm.showConNull();
                alert('不能为空')
            }
            if (vm.house.user_name && vm.house.mobile) {
                //手机号码验证
                if (!(/^1(3|4|5|7|8)\d{9}$/.test(vm.house.mobile))) {
                    // return vm.showConfirmPhoto();
                    alert('号码不能为空')
                }
                let url = '/api/account/users'
                let config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                let data = `mobile=${vm.house.mobile}&name=${vm.house.user_name}&type=1&refereeId=${vm.userInfo.id}`
                axios.post(url, data, config)
                    .then(function (res) {
                        // localStorage.setItem('userInfo', JSON.stringify(res.data))
                        //get access_token
                        vm.userId = res.data.id;
                        let data = `name=${vm.house.user_name}`
                        axios({
                            method: 'put',
                            url: '/api/account/users/' + vm.userId,
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }).then(function successCallback(res) {
                            // vm.name = res.data.name
                        })
                    })
                    .catch(function (error) {
                        alert('错误');
                        console.log(error);
                    });
            }
        }
        let bs64 = window.btoa(vm.userInfo.username + ':' + vm.tokens.access_token)
        // console.log(vm.house, bs64);
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
                    "value": vm.choosedDis.regionId//vm.choosedRegion.id
                }, {
                    "name": "customer_name",
                    "value": vm.house.user_name //$window.localStorage.user_id
                }, {
                    "name": "customer_mobile",
                    "value": vm.userInfo.mobile
                }]
                // , {
                //     "name": "customer_note",
                //     "value": vm.house.note
                // }
            }
        }).then(function successCallback() {
            // vm.$emit('alert', { t: '成功', b: '提交成功' })
            alert('提交成功')
            vm.navCtrl.pop()
        }).catch(function errorCallback() {
            // vm.$emit('alert', { t: '错误', b: '服务器错误' })
            alert('服务器错误')
        })
    }
    clearInputName() {
        this.house.user_name = ''
    }
    clearInputMobile() {
        this.house.mobile = ''
    }
    pushBuyer(h) {
        this.navCtrl.push(h, { staff: this.userInfo });
    }
    presentModal() {
        this.initializeItems();
        this.selections = true;
    }
    presentCancel() {
        this.selections = false;
    }
    searchQuery: string = '';
    items: any;

    initializeItems() {
        let vm = this;
        let url = 'api/housing/subdistricts?size=20'
        axios.get(url)
            .then(function (res) {
                console.log(res)
                vm.items = res.data.data;
            })
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }
    chooseItem(i) {
        this.choosedDis = i;
        this.searchData.input = i.name;
        this.selections = false;
    }
}

