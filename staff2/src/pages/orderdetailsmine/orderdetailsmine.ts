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
  orderDetails: any
  orderNote: any
  buyerInfo: any
  sallerInfo: any
  houseInfo: any
  constructor(public navCtrl: NavController, public params: NavParams) {
    let vm = this
    vm.orderDetails = params.get('mission');
  }

//   $scope.orderDetails = JSON.parse($stateParams.orderList);
//   var bs64 = window.btoa($rootScope.user_name + ':' + $window.localStorage.access_token);
//   $scope.todoOrderInfo = function () {
//   $http({
//     method: 'POST',
//     headers: {"Authorization": "Basic " + bs64},
//     url: $rootScope.baseUrl + '/api/activiti/query/tasks',
//     data: {
//       assignee: $stateParams.id,
//       processInstanceVariables: [
//         {
//           "name": "mission_id",
//           "value": $scope.orderDetails.id,
//           "operation": "equals",
//           "type": "long"
//         }
//       ]
//     }
//   }).then(function successCallback(res) {
//     if (res.data.data.length) {
//       $scope.taskId = res.data.data[0].id;      //taskId
//       if (res.data.data[0].assignee == $rootScope.user_id) {
//         $scope.todoOrder = res.data.data.length;
//       }
//     }
//
//   }, function errorCallback() {
//   })
// }
//   $scope.todoOrderInfo();

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
        console.log(vm.buyerInfo);
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

  }

}
