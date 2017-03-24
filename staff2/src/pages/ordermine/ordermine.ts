import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Orderdetailsmine } from '../orderdetailsmine/orderdetailsmine';
import axios from 'axios';

/*
  Generated class for the Ordermine page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ordermine',
  templateUrl: 'ordermine.html'
})
export class Ordermine {
  sub = []
  choosedidx: any
  userInfo: any = JSON.parse(localStorage.getItem('userInfo'))
  mission: any = []
  items: any = []
  missionIds: any = []
  tasks: any = []
  start: any = 0
  start1: any = 0
  missionData: any
  orderLength: any
  missionLength: any = 10
  allMission: any = 10
  noUnfinishOrders: any
  noOrders: any
  houseIdArr: any = []
  orderdetailsmine: any = Orderdetailsmine
  constructor(public navCtrl: NavController, public navParams: NavParams, public params: NavParams) {}

  //封装房屋信息
  orderInfo(t) {
    let vm = this
    vm.houseIdArr.push(t.houseId)
    axios.get('/api/housing/houses', {
      params: {
        idIn: JSON.stringify(vm.houseIdArr),
        size: 999
      }
    })
      .then(function (res3) {
        for (let j of res3.data.data) {
          if (t.houseId == j.id) {
            t.houseInfo = j;
          }
        }
      })
  }

  loadMore(infiniteScroll){
    let vm = this
    let orderType =''
    let userToken = JSON.parse(localStorage.getItem('tokens'))
    let bs64 = window.btoa(vm.userInfo.username + ':' + userToken.access_token);
    axios({
      method: 'POST',
      headers: {"Authorization": "Basic " + bs64},
      url: '/api/activiti/query/tasks',
      data: {
        assignee: vm.userInfo.id,
        start: vm.start,
        size: 10,
        order: 'desc',
      }
    }).then(function successCallback(res) {
      // console.log(res.data.data);
      vm.tasks = vm.tasks.concat(res.data.data)
      vm.missionData = res.data.total
      vm.missionLength = res.data.data.length
      vm.noUnfinishOrders = !vm.tasks.length
      vm.start = vm.start + 1
      if (vm.tasks.length) {
        for (let t of res.data.data) {
          axios({
            method: 'GET',
            headers: {"Authorization": "Basic " + bs64},
            url: '/api/activiti/runtime/process-instances/' + t.processInstanceId + '/variables/mission_id?sort=creatDate',
          }).then(function successCallback(res2) {
            vm.missionIds.push(res2.data.value);
            if (vm.missionIds.length == res.data.data.length) {
              axios({
                method: 'get',
                url: '/api/mission/missions',
                params: {
                  idIn: JSON.stringify(vm.missionIds),
                  // type: orderType,
                  sort: 'modifiedDate',
                  size: 10
                }
              }).then(function successCallback(res3) {
                vm.mission = res3.data.data;
                vm.noUnfinishOrders = !vm.mission.length;
                for (let j of res3.data.data) {
                  vm.orderInfo(j);
                }
              })
            }
          })
        }
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    })
  }

  loadMore1(infiniteScroll){
    let vm = this
    let params = {
      pcId_OR_pcmId_OR_hkId_OR_hkmId_OR_wcId_OR_lsId_OR_nsId_OR_ctId_OR_csId: vm.userInfo.id,
      size: 10,
      start: vm.start1,
      // type: orderType
    }
    axios({
      method: 'get',
      url:  '/api/mission/missions',
      params: params
    }).then(function successCallback(res) {
      vm.items = vm.items.concat(res.data.data)
      vm.start1 = vm.start1 + 1;
      vm.allMission = res.data.data.length
      vm.noOrders = !vm.items.length;
      vm.orderLength = res.data.total;
      for(let t of vm.items){
        vm.orderInfo(t)
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    })
  }

  ionViewDidEnter(){
    let vm = this
    vm.sub = [{title: '待处理', choose: true}, {title: '全部', choose: false}]
    vm.choosedidx = 0;
  }

  chooseTab(idx) {
    this.choosedidx = idx;
  }
//   $scope.softings = function () {
//   $scope.toggle = !$scope.toggle;
// }

  goDetails(t){
    this.navCtrl.push(Orderdetailsmine, {mission: t})
  }

  ionViewDidLoad() {
    this.loadMore(false)
    this.loadMore1(false)
  }

}
