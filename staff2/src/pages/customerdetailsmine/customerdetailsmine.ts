import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Orderdetailsmine } from '../orderdetailsmine/orderdetailsmine';
import { Newrecord } from '../newrecord/newrecord'
import axios from 'axios'
/*
  Generated class for the Customerdetailsmine page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customerdetailsmine',
  templateUrl: 'customerdetailsmine.html'
})
export class Customerdetailsmine {
  customerInfo: any
  userInfo: any
  choosedidx: any = 0
  choosedli: any = 0
  sub: any = []
  items: any = []
  customerItems: any = []
  start = 0
  missionLength = 10
  orderdetailsmine: any = Orderdetailsmine
  newrecord: any = Newrecord
  constructor(public navCtrl: NavController, public navParams: NavParams, public params: NavParams) {
    let vm = this
    vm.customerInfo = params.get('customer')
  }

  housesInfo (t) {
    if (t.houseId != 0) {
      axios({
        method: 'get',
        url: '/api/housing/houses/' + t.houseId,
      }).then(function successCallback(res) {
        t.houseInfo = res.data;
      })
    }
  }

  loadMore(infinite) {
    let vm = this
    var params = {
      demanderId_OR_supplierId: vm.customerInfo.user.id,
      pcId_OR_pcmId_OR_hkId_OR_hkmId_OR_wcId_OR_lsId_OR_nsId_OR_ctId_OR_csId: vm.customerInfo.server.id,
      start: vm.start,
      size: 10,
      order: 'desc'
    };
    axios({
      method: 'get',
      url: '/api/mission/missions',
      params: params
    }).then(function successCallback(res) {
      vm.items = vm.items.concat(res.data.data);
      vm.missionLength = res.data.data.length;
      vm.start = vm.start + 1;
      for (let t of res.data.data) {
        vm.housesInfo(t)
      }
      if (infinite) {
        infinite.complete()
      }
    })
  }

  chooseTab (idx) {
    let vm = this
    vm.choosedidx = idx;
  }

  deploy(idx) {
    let vm = this
    vm.choosedli = idx;
  }

  goOrderDetails(t) {
    this.navCtrl.push(Orderdetailsmine, {mission: t})
  }

  goNewrecord(){
    let vm = this
    this.navCtrl.push(Newrecord, {userInfo: vm.customerInfo.user})
  }

  ionViewDidLoad() {
    let vm = this
    vm.loadMore(false)
    vm.customerItems = [{
      'time': '2017',
      'content': '想看远洋自然的房子。想看远洋自然的房子。想看远洋自然的房子。'
    },{
      'time': '2017',
      'content': 'dadadasdadada。想看远洋自然的房子。想看远洋自然的房子。'
    },]
    vm.sub = ['相关订单', '跟进记录 '];

    // vm.items = [];
    // vm.start = 0;
    // vm.size = 10;
    // vm.personLength = 10;
    // vm.loadMore = function () {
    //   var params = {
    //     demanderId_OR_supplierId: $stateParams.id,
    //     pcId_OR_pcmId_OR_hkId_OR_hkmId_OR_wcId_OR_lsId_OR_nsId_OR_ctId_OR_csId: $stateParams.pcId,
    //     size: vm.size,
    //     start: vm.start,
    //     order : 'desc'
    //   };
    //   axios({
    //     method: 'get',
    //     url: $rootScope.baseUrl + '/api/mission/missions',
    //     params: params
    //   }).then(function successCallback(res) {
    //     if (res.data.data) {
    //       vm.items = vm.items.concat(res.data.data);
    //       vm.personLength = res.data.data.length;
    //       vm.start = vm.start + 1;
    //       vm.$broadcast('scroll.infiniteScrollComplete');
    //     }
    //   }, function errorCallback() {
    //   })
    // }



  }
}
