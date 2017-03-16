import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';

/*
  Generated class for the Housemine page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-housemine',
    templateUrl: 'housemine.html'
})
export class Housemine {
    houses = [];
    houseTitle = [];
    districts = [];
    totalShelves = '';
    totalAll = '';
    total = '';
    start = 0;
    nameLike = '';
    districtsTotal = '';
    statusIn = '&statusIn=[2]';
    selectTab = 0;
    userInfo: any;
    choosedTab = 10;
    housesTotal = 1;
    inputStart = false;
    addMore = false;
    dataLength = 10;
    searchData = { input: '', district: '' }
    subtabs = [{ id: 0, title: '价格' }, { id: 1, title: '户型' }, { id: 2, title: '钥匙' }, { id: 3, title: '更多' }]
    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        // this.doInfinite(false);
        console.log('ionViewDidLoad HouseminePage');
    }
    ionViewDidEnter() {
        let vm = this;
        vm.selectTab = 0;
        if (localStorage.getItem('userInfo')) {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log('-----', this.userInfo);
            this.totalMessages();
            this.doInfinite(false);
        } else {
            this.userInfo = ''
        }
    }
    totalMessages() {
        let vm = this
        let url = '/api/housing/houses?size=10&hkId=' + this.userInfo.id
        axios
            .get(url + '&statusIn=[2]')
            .then(function (res) {
                vm.totalShelves = res.data.total;
                axios
                    .get(url)
                    .then(function (res) {
                        vm.totalAll = res.data.total;
                        vm.houseTitle = [{ id: 0, name: '在售房源', total: vm.totalShelves, status: '[2]' }, { id: 1, name: '所有房源', total: vm.totalAll, status: '[0,1,2,3,4,5]' }];
                    })
                    .catch(function (error) {
                        alert('服务器错误');
                        console.log(error);
                    });
            })
            .catch(function (error) {
                alert('服务器错误');
                console.log(error);
            });
    }
    selectStatus(m, n) {
        let vm = this;
        vm.inputStart = false;
        vm.addMore = false;
        vm.selectTab = m;
        vm.choosedTab = 10;
        vm.houses = [];
        vm.dataLength = 10;
        vm.searchData.district = "";
        vm.searchData.input = "";
        vm.nameLike = '';
        vm.start = 0;
        vm.statusIn = '&statusIn=' + n;
        let url = '/api/housing/houses?size=10&hkId=' + vm.userInfo.id + vm.nameLike;
        let params = {
            params: {
                start: vm.start
            }
        }
        axios
            .get(url + vm.statusIn, params)
            .then(function (res) {
                setTimeout(() => {
                    vm.houses = res.data.data;
                    vm.dataLength = res.data.data.length;
                    vm.housesTotal = res.data.total;
                    vm.start = 1;
                    vm.addMore = true;
                }, 500);
            })
            .catch(function (error) {
                alert('服务器错误');
                console.log(error);
            });
    }
    doInfinite(infiniteScroll) {
        let vm = this
        vm.addMore = true;
        let url = '/api/housing/houses?size=10&hkId=' + vm.userInfo.id + vm.nameLike;
        let params = {
            params: {
                start: vm.start
            }
        }
        axios
            .get(url + vm.statusIn, params)
            .then(function (res) {
                setTimeout(() => {
                    vm.houses = vm.houses.concat(res.data.data);
                    vm.dataLength = res.data.data.length;
                    vm.housesTotal = res.data.total;
                    vm.start = vm.start + 1;
                    if (infiniteScroll) {
                        infiniteScroll.complete();
                    }
                }, 500);
            })
            .catch(function (error) {
                alert('服务器错误');
                console.log(error);
            });
    }
    chooseTab(t) {
        let vm = this;
        vm.choosedTab = t;
    }
    focus() {
        // this.inputStart = true;
    }
    blur() {
        // this.inputStart = false;
    }
    clearInput() {
        this.searchData.district = ""
        this.searchData.input = '';
        this.nameLike = ''
        this.inputStart = false;
    }
    searchDis(status) {
        let vm = this;
        console.log(vm.searchData.input)
        vm.inputStart = true;
        let statusIn = '&statusIn=' + status;
        let url = '/api/housing/houses?size=10&hkId=' + vm.userInfo.id;
        let params = { params:{kwLike: vm.searchData.input }}
        axios
            .get(url + vm.statusIn, params)
            .then(function (res) {
                vm.districts = res.data.data;
                vm.districtsTotal = res.data.total;
            })
            .catch(function (error) {
                alert('服务器错误');
                console.log(error);
            });
    }
    chooseDis(d) {
        let vm = this;
        vm.searchData.input = d.subdistrict.name;
        vm.inputStart = false;
    }
    inputSearch() {
        let vm = this;
        vm.start = 0;
        vm.inputStart = false;
        vm.addMore = false;
        if (!vm.searchData.input) {
            vm.houses = [];
            vm.dataLength = 1;
            vm.housesTotal = 0;
        }
        vm.houses = [];
        let url = '/api/housing/houses?size=10&hkId=' + vm.userInfo.id;
        let params = { params: { kwLike: vm.searchData.input } }
        axios
            .get(url + vm.statusIn, params)
            .then(function (res) {
                setTimeout(() => {
                    vm.houses = res.data.data;
                    vm.dataLength = res.data.data.length;
                    vm.housesTotal = res.data.total;
                    vm.start = 1;
                    vm.nameLike = '&kwLike=' + vm.searchData.input
                }, 500);
            })
            .catch(function (error) {
                vm.dataLength = 0
                alert('服务器错误');
                console.log(error);
            });
    }
}
