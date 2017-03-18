import { Component, ViewChild } from '@angular/core';
import { NavController,Tabs } from 'ionic-angular';
import { Precise } from '../precise/precise';
import { Login } from '../login/login';
import axios from 'axios';
import { Housedetails } from '../housedetails/housedetails';

/*
  Generated class for the Buy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html'
})
export class Buy {
  @ViewChild('myTabs') tabRef: Tabs;
  // userInfo:any;
  constructor(public navCtrl: NavController) {}
  
  ionViewDidLoad() {
    // this.tabRef.select(1);
    console.log('buy BuyPage didload');
    this.loadMore(false)
    
  }
  
  housedetails = Housedetails
  goDetail(h) {
      this.navCtrl.push(Housedetails, { house: h })
  }

  regions:any
  ionViewWillEnter() {
    console.log('Hello BuyPage willenter');
    let vm = this
    // vm.loadMore(false)
     // vm.regions = ['武侯区', '青羊区', '金牛区', '锦江区', '高新区']
    axios({
        method: 'get',
        url:  '/api/housing/regions?order=asc&sort=menu&size=100&type=2'
    }).then(function (res) {
            var unlimit = { name: '不限' }
            vm.regions = res.data.data
            vm.regions.unshift(unlimit)
        })
  }
  // tabbar
  precise = Precise
  activeAreaTab = false
  activeHouseTypeTab = false
  activePriceTab = false
  activeMoreTab = false
 
  chooseAreaTab (){
    this.activeAreaTab =  !this.activeAreaTab
    this.activeHouseTypeTab = false
    this.activePriceTab = false
    this.activeMoreTab = false
  }
  chooseHouseTypeTab(){
    this.activeAreaTab = false
    this.activeHouseTypeTab = !this.activeHouseTypeTab
    this.activePriceTab = false
    this.activeMoreTab = false
  }
  choosePriceTab(){
    this.activeAreaTab = false
    this.activeHouseTypeTab = false
    this.activePriceTab = !this.activePriceTab
    this.activeMoreTab = false
  }
  chooseMoreTab(){
    this.activeAreaTab = false
    this.activeHouseTypeTab = false
    this.activePriceTab = false
    this.activeMoreTab = !this.activeMoreTab
  }
 
  searchInput (e){
    console.log('--model--',this.search);
    console.log('--event--',e.target.value);
  }
  onCancel(e){
    console.log('--cancel-event--',e);
  }
  //input district 小区
  inputStart = false
  focus() {
      this.inputStart = true
  }
  blur() {
      this.inputStart = false
  }
  searchData = { input: '' }
  clearInput (e) {
      this.searchData.input = ""
      // vm.inputParams = undefined
      this.inputStart = false
  }
  districts = []
  searchDis (e) {
      console.log(this.searchData.input);
      let vm = this
      if (e.target.value){
        this.inputStart = true
      } else {
        this.inputStart = false        
      }
      axios({
          method: 'get',
          url:  '/api/housing/subdistricts',
          params: { size: 10, nameLike: e.target.value }
      }).then(function (res) {
              vm.districts = res.data.data
          })
  }

  chooseDis(d) {
      this.searchData.input = d.name
      console.log('choose searchdata',this.searchData.input);
      this.inputStart = false
  }

  //params
  priceParams = ''
  houseTypeParams = ''
  buildingAreaParams = ''
  buildYearParams = ''
  orientationParams = ''
  regionParams = ''

  inputParams = ''
  houses = [];
  start = 0;
  dataLength = 0
  // vm.size = 10;
  // vm.status = 2
  loadMore (infiniteScroll) {
      // vm.start = vm.start + 1
      let vm = this
      let params = { start: vm.start }
      let tabParams = vm.priceParams + vm.houseTypeParams + vm.buildingAreaParams + vm.buildYearParams + vm.orientationParams + vm.regionParams
      axios({
          method: 'get',
          url:  '/api/housing/houses?size=10&status=2' + tabParams,
          params: params
      }).then(function(res) {
              // console.log(res.data.data)
              vm.houses = vm.houses.concat(res.data.data);
              vm.dataLength = res.data.data.length
              // vm.housesTotal = res.data.total
              if (infiniteScroll) {
                  infiniteScroll.complete();
              }
              vm.start = vm.start + 1
          })
  }
  // vm.loadMore()

  search() {
      let vm = this
      vm.houses = [];
      vm.start = 0;
      vm.dataLength = 10;
      let params = { start: vm.start }
      let tabParams = vm.priceParams + vm.houseTypeParams + vm.buildingAreaParams + vm.buildYearParams + vm.orientationParams + vm.regionParams
      axios({
          method: 'get',
          url:  '/api/housing/houses?size=10&status=2' + tabParams,
          params: params
      }).then(function (res) {
              vm.houses = vm.houses.concat(res.data.data);
              vm.dataLength = res.data.data.length
              // vm.housesTotal = res.data.total
              vm.start = vm.start + 1
          })
  }

  inputSearch () {
      let vm = this
      vm.houses = [];
      vm.start = 0;
      vm.dataLength = 10;

      let params = { start: vm.start }
      Object.assign(params, { kwLike: vm.searchData.input })
      axios({
          method: 'get',
          url:  '/api/housing/houses?size=10&status=2',
          params: params
      }).then(function (res) {
              vm.houses = vm.houses.concat(res.data.data);
              vm.dataLength = res.data.data.length
              // vm.housesTotal = res.data.total
              vm.start = vm.start + 1
          })
  }
    // subtabs = [{ title: '区域' }, { title: '价格' }, { title: '房型' }, { title: '更多' }]
    // // vm.subtabs = ['区域', '价格', '房型', '更多']
    // chooseTab (t, idx) {
    //     vm.choosedTab = t
    //     vm.choosedTabIdx = idx
    // }

  // //区域
  // areatabs = ['区域']//, '地铁', '附近'
  // choosedAreatab = '区域'
  // chooseAreatab  (a) {
  //     this.choosedAreatab = a
  // }
    choosedRegion:any
    chooseRegion (p) {
      let vm = this
        vm.choosedRegion = p
        if (p.name == '不限') {
            vm.regionParams = ''
        } else {
            vm.regionParams = '&regionName=' + p.name
        }
        vm.search()
        console.log(vm.regionParams);
    }

    //价格
    prices = [{ name: '不限', params: '' }, { name: '200万以下', params: '&priceLessThan=200' }, { name: '200-250万', params: '&priceGreaterThanOrEquals=200&priceLessThanOrEquals=250' }, { name: '250-300万', params: '&priceGreaterThanOrEquals=250&priceLessThanOrEquals=300' }, { name: '300-400万', params: '&priceGreaterThanOrEquals=300&priceLessThanOrEquals=400' }, { name: '400-500万', params: '&priceGreaterThanOrEquals=400&priceLessThanOrEquals=500' }, { name: '500-800万', params: '&priceGreaterThanOrEquals=500&priceLessThanOrEquals=800' }, { name: '800万以上', params: '&priceGreaterThan=800' }]
    choosedPrice:any
    priceTabTitle:any
    choosePrice (p) {
        let vm = this
        vm.choosedPrice = p
        vm.priceParams = p.params
        vm.priceTabTitle = p.name
        this.activePriceTab = !this.activePriceTab        
        vm.search()
        console.log(vm.priceParams);
    }
    //房型
    houseTypes = [{ name: '不限', params: '' }, { name: '1室', params: '&houseType=1' }, { name: '2室', params: '&houseType=2' }, { name: '3室', params: '&houseType=3' }, { name: '3室以上', params: '&houseTypeGreaterThan=3' }]
    choosedHouseType:any
    houseTypeTabTitle:any
    chooseHouseType (p) {
        let vm = this
        vm.choosedHouseType = p
        vm.houseTypeParams = p.params
        vm.houseTypeTabTitle = p.name
        this.activeHouseTypeTab = !this.activeHouseTypeTab                
        vm.search()
        console.log(vm.houseTypeParams);
    }

    //朝向
    orientations = [{ name: '不限', params: '' }, { name: '朝西', params: '&orientation=1' }, { name: '朝东', params: '&orientation=2' }, { name: '朝北', params: '&orientation=3' }, { name: '朝南', params: '&orientation=4' }, { name: '南北', params: '&orientation=5' }]
    choosedOrientation:any
    chooseOrientation (p) {
        let vm = this
        vm.choosedOrientation = p
        vm.orientationParams = p.params
        console.log(vm.orientationParams);
    }
    //面积
    buildingAreas = [{ name: '不限', params: '' }, { name: '50平米以下', params: '&buildingAreaLessThan=50' }, { name: '50-70平米', params: '&buildingAreaGreaterThanOrEquals=50&buildingAreaLessThanOrEquals=70' }, { name: '70-90平米', params: '&buildingAreaGreaterThanOrEquals=70&buildingAreaLessThanOrEquals=90' }, { name: '90-110平米', params: '&buildingAreaGreaterThanOrEquals=90&buildingAreaLessThanOrEquals=110' }, { name: '110-130平米', params: '&buildingAreaGreaterThanOrEquals=110&buildingAreaLessThanOrEquals=130' }, { name: '130-150平米', params: '&buildingAreaGreaterThanOrEquals=130&buildingAreaLessThanOrEquals=150' }, { name: '150-200平米', params: '&buildingAreaGreaterThanOrEquals=150&buildingAreaLessThanOrEquals=200' }, { name: '200平米以上', params: '&buildingAreaGreaterThan=200' }]
    choosedBuildingArea:any
    chooseBuildingArea (p) {
        let vm = this
        vm.choosedBuildingArea = p
        vm.buildingAreaParams = p.params
        console.log(vm.buildingAreaParams);
    }
    //楼龄
    buildYears = [{ name: '不限', params: '' }, { name: '5年以內', params: '&buildYearLessThanOrEquals=50' }, { name: '10年以內', params: '&buildYearLessThanOrEquals=10' }, { name: '15年以內', params: '&buildYearLessThanOrEquals=15' }, { name: '20年以内', params: '&buildYearLessThanOrEquals=20' }, { name: '20年以上', params: '&buildYearGreaterThan=20' }]
    choosedBuildYear:any
    chooseBuildYear (p) {
        let vm = this
        vm.choosedBuildYear = p
        vm.buildYearParams = p.params
        console.log(vm.buildYearParams);
    }
    // 标签
    tags = ['地铁', '满两年', '满五唯一', '新上', '独家', '有钥匙']
    choosedTag:any
    chooseTag (p) {
        let vm = this
        vm.choosedTag = p
    }
    endMore () {
        let vm = this
        vm.search()
        console.log(vm.choosedOrientation, vm.choosedBuildingArea)
    }
    clearMore () {
        let vm = this
        vm.choosedOrientation = undefined
        vm.orientationParams = ''
        vm.choosedBuildingArea = undefined
        vm.buildingAreaParams = ''
        vm.choosedBuildYear = undefined
        vm.buildYearParams = ''
        vm.choosedOrientation = undefined
        vm.orientationParams = ''
    }

//go precise
  goPrecise(){
    if (window.localStorage.getItem('tokens')){
       this.navCtrl.push(Precise)
    } else {
       this.navCtrl.push(Login)      
    }
  }

}
