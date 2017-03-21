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
  choosedidx: any = 0
  checkedp: any
  userId: any
  mission: any = []
  noUnfinishOrders: any
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
            console.log(j);
          }
        }
      })
      .catch(function (error) {
      });
  }

  ionViewDidEnter(){
    let vm = this
    let orderType =''
    let missionIds = []
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let userToken = JSON.parse(localStorage.getItem('tokens'))
    let bs64 = window.btoa(userInfo.username + ':' + userToken.access_token);
    vm.sub = [{title: '待处理', choose: true}, {title: '全部', choose: false}]
    vm.choosedidx = 0;
    vm.checkedp = this.sub[0];
    axios({
      method: 'POST',
      headers: {"Authorization": "Basic " + bs64},
      url: '/api/activiti/query/tasks',
      data: {
        assignee: userInfo.id,
        size: 999,
        order: 'desc',
      }
    }).then(function successCallback(res) {
      if (res.data.data.length) {
        for (let t of res.data.data) {
          axios({
            method: 'GET',
            headers: {"Authorization": "Basic " + bs64},
            url:'/api/activiti/runtime/process-instances/' + t.processInstanceId + '/variables/mission_id?sort=creatDate',
          }).then(function successCallback(res2) {
            missionIds.push(res2.data.value);
            if (missionIds.length == res.data.data.length) {
              // console.log(missionIds);
              axios({
                method: 'get',
                url: '/api/mission/missions',
                params: {
                  idIn: JSON.stringify(missionIds),
                  // type: orderType,
                  sort: 'modifiedDate',
                  size: 999
                }
              }).then(function successCallback(res3) {
                vm.mission = res3.data.data;
                vm.noUnfinishOrders = !vm.mission.length;
                for(let j of res3.data.data){
                  vm.orderInfo(j);
                }
              }, function errorCallback() {
              })
            }
          })
            .catch(function (error) {
            });
        }
      }
    })
      .catch(function (error) {
      });
  }

  chooseTab(t, idx) {
    // this.checkedp = t;
    this.choosedidx = idx;
  }
//   $scope.softings = function () {
//   $scope.toggle = !$scope.toggle;
// }

  goDetails(t){
    this.navCtrl.push(Orderdetailsmine, {mission: t})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderminePage');
  }

}
