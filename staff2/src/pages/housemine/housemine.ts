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
    roleName: any;
    choosedTab = 10;
    housesTotal = 1;
    inputStart = false;
    addMore = false;
    activeAreaTab = false
    activeHouseTypeTab = false
    activePriceTab = false
    activeMoreTab = false
    dataLength = 10;
    searchData = { input: '', district: '' }
    subtabs = [{ id: 0, title: '价格' }, { id: 1, title: '户型' }, { id: 2, title: '钥匙' }, { id: 3, title: '更多' }]
    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        // this.doInfinite(false);
        console.log('ionViewDidLoad HouseminePage');
    }
    ionViewWillEnter() {
        this.roleName = localStorage.getItem('role')
    }
    ionViewDidEnter() {
        let vm = this;
        vm.selectTab = 0;
        if (localStorage.getItem('userInfo')) {
            vm.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log('-----', vm.userInfo);
            vm.totalMessages();
            vm.doInfinite(false);
        } else {
            vm.userInfo = ''
        }
    }

    presentPopover(e) {
        console.log(e);
    }

    totalMessages() {
        let vm = this;
        let url = ''
        if (vm.roleName == '房管家') {
            url = '/api/housing/houses?size=10&hkId=' + vm.userInfo.id;
        }
        if (vm.roleName == '租赁专员') {
            url = '/api/housing/rents?size=10&hkId=' + vm.userInfo.id;
        }
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
        let url = ''
        if (vm.roleName == '房管家') {
            url = '/api/housing/houses?size=10&hkId=' + vm.userInfo.id + vm.nameLike;
        }
        if (vm.roleName == '租赁专员') {
            url = '/api/housing/rents?size=10&hkId=' + vm.userInfo.id + vm.nameLike;
        }
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
        let url = ''
        if (vm.roleName == '房管家') {
            url = '/api/housing/houses?size=10&hkId=' + vm.userInfo.id + vm.nameLike;
        }
        if (vm.roleName == '租赁专员') {
            url = '/api/housing/rents?size=10&hkId=' + vm.userInfo.id + vm.nameLike;
        }
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
    // chooseTab(t) {
    //     let vm = this;
    //     vm.choosedTab = t;
    // }


    chooseAreaTab() {
        this.activeHouseTypeTab = false
        this.activePriceTab = false
        this.activeMoreTab = false
        this.activeAreaTab = !this.activeAreaTab
    }
    chooseHouseTypeTab() {
        this.activeAreaTab = false
        this.activeHouseTypeTab = !this.activeHouseTypeTab
        this.activePriceTab = false
        this.activeMoreTab = false
    }
    choosePriceTab() {
        this.activeAreaTab = false
        this.activeHouseTypeTab = false
        this.activePriceTab = !this.activePriceTab
        this.activeMoreTab = false
    }
    chooseMoreTab() {
        this.activeAreaTab = false
        this.activeHouseTypeTab = false
        this.activePriceTab = false
        this.activeMoreTab = !this.activeMoreTab
    }

    clearInput() {
        this.searchData.district = ""
        this.searchData.input = '';
        this.nameLike = ''
        this.inputStart = false;
    }

    searchDis(e, status) {
        let vm = this;
        vm.inputStart = true;
        let statusIn = '&statusIn=' + status;
        let url = ''
        if (vm.roleName == '房管家') {
            url = '/api/housing/houses?size=10&hkId=' + vm.userInfo.id;
        }
        if (vm.roleName == '租赁专员') {
            url = '/api/housing/rents?size=10&hkId=' + vm.userInfo.id;
        }
        if (e == '') {
            vm.districtsTotal = '0';
        }
        let params = { params: { kwLike: vm.searchData.input } }
        axios
            .get(url + vm.statusIn, params)
            .then(function (res) {
                vm.districts = res.data.data;
                vm.districtsTotal = res.data.total;
            })
            .catch(function (error) {
                alert('服务器错误');
                console.log(error);
                vm.districtsTotal = '0';
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
        let url = ''
        if (vm.roleName == '房管家') {
            url = '/api/housing/houses?size=10&hkId=' + vm.userInfo.id;
        }
        if (vm.roleName == '租赁专员') {
            url = '/api/housing/rents?size=10&hkId=' + vm.userInfo.id;
        }
        let params = { params: { kwLike: vm.searchData.input } }
        axios
            .get(url + vm.statusIn, params)
            .then(function (res) {
                setTimeout(() => {
                    vm.houses = res.data.data;
                    vm.dataLength = res.data.data.length;
                    vm.housesTotal = res.data.total;
                    vm.start = 1;
                    vm.nameLike = '&kwLike=' + vm.searchData.input;
                    vm.addMore = true;
                }, 500);
            })
            .catch(function (error) {
                vm.dataLength = 0
                alert('服务器错误');
                console.log(error);
            });
    }


    // 删选条件

    //钥匙
    houseKey = [{ name: '不限', params: '' }, { name: '有钥匙', params: '&hasKey=true' }, { name: '无钥匙', params: '&hasKey=false' }]
    chooseHouseKey = function (p) {
        let vm = this;
        vm.choosedHouseKey = p
        vm.hasKeyParams = p.params
        vm.choosedTab.title = p.name
        vm.popover.hide()
        vm.search()
        // console.log(vm.hasKeyParams);
    }
    //价格
    prices = [{ name: '不限', params: '' }, { name: '200万以下', params: '&priceLessThan=200' }, { name: '200-250万', params: '&priceGreaterThanOrEquals=200&priceLessThanOrEquals=250' }, { name: '250-300万', params: '&priceGreaterThanOrEquals=250&priceLessThanOrEquals=300' }, { name: '300-400万', params: '&priceGreaterThanOrEquals=300&priceLessThanOrEquals=400' }, { name: '400-500万', params: '&priceGreaterThanOrEquals=400&priceLessThanOrEquals=500' }, { name: '500-800万', params: '&priceGreaterThanOrEquals=500&priceLessThanOrEquals=800' }, { name: '800万以上', params: '&priceGreaterThan=800' }]
    choosePrice = function (p) {
        let vm = this;
        vm.choosedPrice = p
        vm.priceParams = p.params
        vm.choosedTab.title = p.name
        vm.popover.hide()
        vm.search()
        // console.log(vm.priceParams);
    }
    //价格范围
    // vm.chooseSure = function () {
    //     vm.priceStart = vm.priceData.priceGreaterThanOrEquals
    //     vm.priceEnd = vm.priceData.priceLessThanOrEquals
    //     vm.search();
    //     vm.popover.hide();
    // }
    //房型
    houseTypes = [{ name: '不限', params: '' }, { name: '1室', params: '&houseType=1' }, { name: '2室', params: '&houseType=2' }, { name: '3室', params: '&houseType=3' }, { name: '3室以上', params: '&houseTypeGreaterThan=3' }]
    chooseHouseType = function (p) {
        let vm = this;
        vm.choosedHouseType = p
        vm.houseTypeParams = p.params
        vm.choosedTab.title = p.name
        vm.popover.hide()
        vm.search()
        // console.log(vm.houseTypeParams);
    }
    //朝向
    orientations = [{ name: '不限', params: '' }, { name: '朝西', params: '&orientation=1' }, { name: '朝东', params: '&orientation=2' }, { name: '朝北', params: '&orientation=3' }, { name: '朝南', params: '&orientation=4' }, { name: '南北', params: '&orientation=5' }]
    chooseOrientation = function (p) {
        let vm = this;
        vm.choosedOrientation = p
        vm.orientationParams = p.params
        // console.log(vm.orientationParams);
    }
    //面积
    buildingAreas = [{ name: '不限', params: '' }, { name: '50平米以下', params: '&buildingAreaLessThan=50' }, { name: '50-70平米', params: '&buildingAreaGreaterThanOrEquals=50&buildingAreaLessThanOrEquals=70' }, { name: '70-90平米', params: '&buildingAreaGreaterThanOrEquals=70&buildingAreaLessThanOrEquals=90' }, { name: '90-110平米', params: '&buildingAreaGreaterThanOrEquals=90&buildingAreaLessThanOrEquals=110' }, { name: '110-130平米', params: '&buildingAreaGreaterThanOrEquals=110&buildingAreaLessThanOrEquals=130' }, { name: '130-150平米', params: '&buildingAreaGreaterThanOrEquals=130&buildingAreaLessThanOrEquals=150' }, { name: '150-200平米', params: '&buildingAreaGreaterThanOrEquals=150&buildingAreaLessThanOrEquals=200' }, { name: '200平米以上', params: '&buildingAreaGreaterThan=200' }]
    chooseBuildingArea = function (p) {
        let vm = this;
        vm.choosedBuildingArea = p
        vm.buildingAreaParams = p.params
        // console.log(vm.buildingAreaParams);
    }
    //楼龄
    buildYears = [{ name: '不限', params: '' }, { name: '5年以內', params: '&buildYearLessThanOrEquals=50' }, { name: '10年以內', params: '&buildYearLessThanOrEquals=10' }, { name: '15年以內', params: '&buildYearLessThanOrEquals=15' }, { name: '20年以内', params: '&buildYearLessThanOrEquals=20' }, { name: '20年以上', params: '&buildYearGreaterThan=20' }]
    chooseBuildYear = function (p) {
        let vm = this;
        vm.chooseduildYear = p
        vm.buildYearParams = p.params
        // console.log(vm.buildYearParams);
    }

    endMore = function () {
        let vm = this;
        vm.search()
        vm.popover.hide()
        // console.log(vm.choosedDirection, vm.choosedBuildingArea)
    }
    clearMore = function () {
        let vm = this;
        vm.choosedDirection = undefined
        vm.directionParams = ''
        vm.choosedBuildingArea = undefined
        vm.buildingAreaParams = ''
        vm.chooseduildYear = undefined
        vm.buildYearParams = ''
        vm.choosedOrientation = undefined
        vm.orientationParams = ''
    }


}
