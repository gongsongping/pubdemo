import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';
/*
  Generated class for the Orderdetailsmine page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-orderdetailsmine',
  templateUrl: 'orderdetailsmine.html'
})
export class Orderdetailsmine {
  userInfo: any = JSON.parse(localStorage.getItem('userInfo'))
  orderDetails: any
  orderNote: any
  buyerInfo: any
  sallerInfo: any
  houseInfo: any
  staff: any
  taskId: any
  todoOrder: any
  constructor(public navCtrl: NavController, public params: NavParams) {
    this.orderDetails = params.get('mission');
    this.staff = params.get('staff');
  }

  ionViewDidLoad() {
    let vm = this
    axios({
      method: 'get',
      url: '/api/mission/missions/' + vm.orderDetails.id,
    }).then(function successCallback(res) {
      vm.orderNote = res.data.records[0].note;
    })
    //买家信息
    if (vm.orderDetails.demanderId != 0) {
      axios({
        method: 'get',
        url: '/api/account/users/' + vm.orderDetails.demanderId,
      }).then(function successCallback(res) {
        vm.buyerInfo = res.data
      })
    }
    //卖家信息
    if (vm.orderDetails.supplierId != 0) {
      axios({
        method: 'get',
        url: '/api/account/users/' + vm.orderDetails.supplierId,
      }).then(function successCallback(res) {
        vm.sallerInfo = res.data
      })
    }
    //房屋信息
    if (vm.orderDetails.houseId != 0) {
      axios({
        method: 'get',
        url: '/api/housing/houses/' + vm.orderDetails.houseId,
      }).then(function successCallback(res) {
        vm.houseInfo = res.data
      })
    }
    //判断是否为待处理订单
    let userToken = JSON.parse(localStorage.getItem('tokens'))
    let bs64 = window.btoa(vm.userInfo.username + ':' + userToken.access_token)
    axios({
      method: 'POST',
      headers: {"Authorization": "Basic " + bs64},
      url: '/api/activiti/query/tasks',
      data: {
        assignee: vm.staff.id,
        processInstanceVariables: [
          {
            "name": "mission_id",
            "value": vm.orderDetails.id,
            "operation": "equals",
            "type": "long"
          }
        ]
      }
    }).then(function successCallback(res) {
      if (res.data.data.length) {
        vm.taskId = res.data.data[0].id;
        if (res.data.data[0].assignee == vm.userInfo.id ) {
          vm.todoOrder = res.data.data.length;
        }
      }
    })
  }

}
