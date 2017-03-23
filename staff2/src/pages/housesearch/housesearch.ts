import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';

/*
  Generated class for the Housesearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-housesearch',
    templateUrl: 'housesearch.html'
})
export class Housesearch {
    houses = [];
    districts = [];
    regions = [];
    housesTotal = 1;
    nameLike = '';
    priceParams = ''
    houseTypeParams = ''
    buildingAreaParams = ''
    buildYearParams = ''
    orientationParams = ''
    regionParams = ''
    hasKeyParams = ''
    inputParams = ''
    choosedHouseKey = ''
    choosedPrice = ''
    choosedHouseType = ''
    choosedOrientation = ''
    choosedBuildingArea = ''
    chooseduildYear = ''
    directionParams = ''
    districtsTotal = ''
    buildStatusParams = '&statusIn=[0,2]';
    chooseduildStatus = ''
    choosedRegion = ''
    choosed = false;
    inputStart = false;
    activeAreaTab = false
    activeHouseTypeTab = false
    activePriceTab = false
    activeMoreTab = false
    addMore = false;
    userInfo: any;
    roleName: any;
    start = 0;
    dataLength = 10;
    searchData = { input: '', district: '' }
    subtabs = {  activeArea: '区域',activePrice: '价格', activeHouse: '户型', activeMore: '更多' }
    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        this.doInfinite(false);
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
            vm.doInfinite(false);
            vm.areaList();
        } else {
            vm.userInfo = ''
        }
    }

    // 删选条件
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
    chooseAreaTab() {
        this.activeHouseTypeTab = false
        this.activePriceTab = false
        this.activeMoreTab = false
        this.activeAreaTab = !this.activeAreaTab
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

    doInfinite(infiniteScroll) {
        let vm = this
        vm.addMore = true;
        let url = '/api/housing/houses?size=10';
        let params = {
            params: {
                start: vm.start
            }
        }
        axios
            .get(url + vm.nameLike + vm.priceParams + vm.houseTypeParams + vm.buildingAreaParams + vm.buildYearParams + vm.orientationParams + vm.buildStatusParams + vm.regionParams, params)
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
    searchDis(e) {
        let vm = this;
        vm.inputStart = true;
        let url = ''
        if (vm.roleName == '房管家') {
            url = '/api/housing/houses?size=10';
        }
        if (vm.roleName == '租赁专员') {
            url = '/api/housing/rents?size=10';
        }
        if (e == '') {
            vm.districtsTotal = '0';
        }
        let params = { params: { kwLike: vm.searchData.input } }
        axios
            .get(url + vm.nameLike + vm.priceParams + vm.houseTypeParams + vm.buildingAreaParams + vm.buildYearParams + vm.orientationParams + vm.buildStatusParams + vm.regionParams, params)
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
            url = '/api/housing/houses?size=10';
        }
        if (vm.roleName == '租赁专员') {
            url = '/api/housing/rents?size=10';
        }
        let params = { params: { kwLike: vm.searchData.input } }
        axios
            .get(url + vm.nameLike + vm.priceParams + vm.houseTypeParams + vm.buildingAreaParams + vm.buildYearParams + vm.orientationParams + vm.buildStatusParams + vm.regionParams, params)
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
    search() {
        let vm = this;
        vm.houses = [];
        let url = ''
        if (vm.roleName == '房管家') {
            url = '/api/housing/houses?size=10';
        }
        if (vm.roleName == '租赁专员') {
            url = '/api/housing/rents?size=10';
        }
        axios
            .get(url + vm.nameLike + vm.priceParams + vm.houseTypeParams + vm.buildingAreaParams + vm.buildYearParams + vm.orientationParams + vm.buildStatusParams + vm.regionParams)
            .then(function (res) {
                vm.houses = res.data.data;
                vm.dataLength = res.data.data.length
                if (res.data.total < 10) {
                    vm.dataLength = 0;
                } else {
                    vm.start = 1;
                }
            })
            .catch(function (error) {
                vm.dataLength = 0
                alert('服务器错误');
                console.log(error);
            });
    }
    //区域
    areatabs = ['区域']//, '地铁', '附近'
    choosedAreatab = '区域'
    chooseAreatab = function (a) {
        this.choosedAreatab = a
    }
    // vm.districts = ['武侯区', '青羊区', '金牛区', '锦江区', '高新区']
    areaList() {
        let vm = this;
        let url = '/api/housing/regions?order=asc&sort=menu&size=100&type=2'
        axios
            .get(url)
            .then(function (res) {
                console.log(res.data.data)
                var unlimit = { name: '不限' }
                vm.regions = res.data.data
                vm.regions.unshift(unlimit)
            })
            .catch(function (error) {
                vm.dataLength = 0
                alert('服务器错误');
                console.log(error);
            });
    }
    chooseRegion(p) {
        let vm = this;
        vm.choosedRegion = p
        if (p.name == '不限') {
            vm.regionParams = ''
        } else {
            vm.regionParams = '&regionName=' + p.name
        }
        vm.activeAreaTab = !vm.activeAreaTab;
        vm.search()
    }
    //价格
    prices = [{ name: '不限', params: '' }, { name: '200万以下', params: '&priceLessThan=200' }, { name: '200-250万', params: '&priceGreaterThanOrEquals=200&priceLessThanOrEquals=250' }, { name: '250-300万', params: '&priceGreaterThanOrEquals=250&priceLessThanOrEquals=300' }, { name: '300-400万', params: '&priceGreaterThanOrEquals=300&priceLessThanOrEquals=400' }, { name: '400-500万', params: '&priceGreaterThanOrEquals=400&priceLessThanOrEquals=500' }, { name: '500-800万', params: '&priceGreaterThanOrEquals=500&priceLessThanOrEquals=800' }, { name: '800万以上', params: '&priceGreaterThan=800' }]
    choosePrice(p) {
        let vm = this;
        vm.choosedPrice = p
        vm.priceParams = p.params
        vm.subtabs.activePrice = p.name
        vm.activePriceTab = !vm.activePriceTab
        vm.search()
        // console.log(vm.priceParams);
    }
    //房型
    houseTypes = [{ name: '不限', params: '' }, { name: '1室', params: '&houseType=1' }, { name: '2室', params: '&houseType=2' }, { name: '3室', params: '&houseType=3' }, { name: '3室以上', params: '&houseTypeGreaterThan=3' }]
    chooseHouseType(p) {
        let vm = this;
        vm.choosedHouseType = p
        vm.houseTypeParams = p.params
        vm.subtabs.activeHouse = p.name
        vm.activeHouseTypeTab = !vm.activeHouseTypeTab
        vm.search()
        // console.log(vm.houseTypeParams);
    }
    //朝向
    orientations = [{ name: '不限', params: '' }, { name: '朝西', params: '&orientation=1' }, { name: '朝东', params: '&orientation=2' }, { name: '朝北', params: '&orientation=3' }, { name: '朝南', params: '&orientation=4' }, { name: '南北', params: '&orientation=5' }]
    chooseOrientation(p) {
        let vm = this;
        vm.choosedOrientation = p
        vm.orientationParams = p.params
        // console.log(vm.orientationParams);
    }
    //面积
    buildingAreas = [{ name: '不限', params: '' }, { name: '50平米以下', params: '&buildingAreaLessThan=50' }, { name: '50-70平米', params: '&buildingAreaGreaterThanOrEquals=50&buildingAreaLessThanOrEquals=70' }, { name: '70-90平米', params: '&buildingAreaGreaterThanOrEquals=70&buildingAreaLessThanOrEquals=90' }, { name: '90-110平米', params: '&buildingAreaGreaterThanOrEquals=90&buildingAreaLessThanOrEquals=110' }, { name: '110-130平米', params: '&buildingAreaGreaterThanOrEquals=110&buildingAreaLessThanOrEquals=130' }, { name: '130-150平米', params: '&buildingAreaGreaterThanOrEquals=130&buildingAreaLessThanOrEquals=150' }, { name: '150-200平米', params: '&buildingAreaGreaterThanOrEquals=150&buildingAreaLessThanOrEquals=200' }, { name: '200平米以上', params: '&buildingAreaGreaterThan=200' }]
    chooseBuildingArea(p) {
        let vm = this;
        vm.choosedBuildingArea = p
        vm.buildingAreaParams = p.params
        // console.log(vm.buildingAreaParams);
    }
    //楼龄
    buildYears = [{ name: '不限', params: '' }, { name: '5年以內', params: '&buildYearLessThanOrEquals=50' }, { name: '10年以內', params: '&buildYearLessThanOrEquals=10' }, { name: '15年以內', params: '&buildYearLessThanOrEquals=15' }, { name: '20年以内', params: '&buildYearLessThanOrEquals=20' }, { name: '20年以上', params: '&buildYearGreaterThan=20' }]
    chooseBuildYear(p) {
        let vm = this;
        vm.chooseduildYear = p
        vm.buildYearParams = p.params
    }
    
    //状态
    chooseStatus = [{ name: '全部', params: '&statusIn=[0,2]' }, { name: '初始状态', params: '&statusIn=[0]' }, { name: '已上架', params: '&statusIn=[2]' }]
    chooseBuildStatus = function (p) {
        let vm =this;
        vm.chooseduildStatus = p
        vm.buildStatusParams = p.params
    }
    endMore() {
        let vm = this;
        vm.activeMoreTab = !vm.activeMoreTab;
        vm.search();
    }
    clearMore() {
        let vm = this;
        vm.directionParams = ''
        vm.choosedBuildingArea = undefined
        vm.buildingAreaParams = ''
        vm.chooseduildYear = undefined
        vm.buildYearParams = ''
        vm.choosedOrientation = undefined
        vm.orientationParams = ''
        vm.chooseduildStatus = undefined
        vm.buildStatusParams = ''
    }
    
}

