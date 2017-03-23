import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
//   if ($scope.orderDetails.demanderId != 0) {                      //买家
//   $http({
//     method: 'get',
//     url: $rootScope.baseUrl + '/api/account/users/' + $scope.orderDetails.demanderId,
// }).then(function successCallback(res) {
//   $scope.buyerName = res.data.name;
//   $scope.buyerMobile = res.data.mobile;
// }, function errorCallback() {
// })
// }
// if ($scope.orderDetails.supplierId != 0) {                //卖家
//   $http({
//     method: 'get',
//     url: $rootScope.baseUrl + '/api/account/users/' + $scope.orderDetails.supplierId,
//   }).then(function successCallback(res) {
//     $scope.sallerName = res.data.name;
//     $scope.sallerMobile = res.data.mobile;
//   }, function errorCallback() {
//   })
// }
// if ($scope.orderDetails.houseId != 0) {
//   $http({
//     method: 'get',
//     url: $rootScope.baseUrl + '/api/housing/houses/' + $scope.orderDetails.houseId,
//   }).then(function successCallback(res) {
//     $scope.smallArea = res.data.name;
//     $scope.detailAddr = res.data.detailAddr;
//     $scope.alHouseType = res.data.houseType;
//     $scope.alBuildingArea = res.data.buildingArea;
//     $scope.floor = res.data.floor;
//     $scope.totalFloor = res.data.totalFloor;
//     $scope.orientation = res.data.orientation;
//     $scope.price = res.data.price;
//     $scope.decorate = res.data.decorate;
//   }, function errorCallback() {
//   })
// }
// $http({                //备注
//   method: 'get',
//   url: $rootScope.baseUrl + '/api/mission/missions/' + $scope.orderDetails.id,
// }).then(function successCallback(res) {
//   $scope.orderNote = res.data.records[0].note;
// }, function errorCallback() {
// })

  ionViewDidLoad() {
    let vm = this
    console.log(vm.orderDetails);
  }

}
