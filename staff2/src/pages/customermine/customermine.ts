import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Customerdetailsmine } from '../customerdetailsmine/customerdetailsmine'
import axios from 'axios'

/*
  Generated class for the Customermine page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customermine',
  templateUrl: 'customermine.html'
})
export class Customermine {
  choosedidx: any
  sub: any = []
  customors: any = []
  recomend: any = [];
  userLenght: any
  personLength: any = 10
  noCustomer: any
  recommendLenght: any
  noRecommendCustomer: any
  start: any = 0
  userInfo: any = JSON.parse(localStorage.getItem('userInfo'))
  customerdetailsmine: any = Customerdetailsmine
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

//   vm.searchData = {val: ''}
//   vm.pcId = $stateParams.id;
//   vm.personLength = 10;
// vm.softings = function () {
//   vm.toggle = !vm.toggle;
// }
//
// //创建浮动框
// $ionicPopover.fromTemplateUrl("templates/_contact.html", {
//   scope: vm
// }).then(function (popover) {
//   vm.popover = popover;
// })
// vm.closePopover = function () {
//   vm.popover.hide();
// };
// // 销毁事件回调处理
// vm.$on("$destroy", function () {
//   vm.popover.remove();
// });
// vm.openPopover = function ($event) {
//   vm.popover.show($event);
//   var department = '';
//   vm.department = [];
//   axios({
//     method: 'get',
//     url: $rootScope.baseUrl + '/api/account/employees/' + $rootScope.user_id,
//   }).then(function successCallback(res) {
//     department = res.data.department;
//     while (department) {
//       vm.department.unshift(department);
//       department = department.superior;
//     }
//     if (vm.department[0]) {
//       vm.data.mycity = vm.department[0].id;
//       vm.isarea = true;
//       axios({
//         method: 'get',
//         url: $rootScope.baseUrl + '/api/account/departments',
//         params: {superiorId: vm.data.mycity}
//       }).then(function successCallback(res) {
//         vm.areas = res.data.data;
//       }, function errorCallback() {
//
//       })
//     }
//     if (vm.department[1]) {
//       vm.data.myarea = vm.department[1].id;
//       vm.isbranch = true;
//       axios({
//         method: 'get',
//         url: $rootScope.baseUrl + '/api/account/departments',
//         params: {superiorId: vm.data.myarea}
//       }).then(function successCallback(res) {
//         vm.branches = res.data.data;
//       }, function errorCallback() {
//
//       })
//     }
//     if (vm.department[2]) {
//       vm.data.mybranch = vm.department[2].id;
//       vm.isgroup = true;
//       axios({
//         method: 'get',
//         url: $rootScope.baseUrl + '/api/account/departments',
//         params: {superiorId: vm.data.mybranch}
//       }).then(function successCallback(res) {
//         vm.groups = res.data.data;
//       }, function errorCallback() {
//
//       })
//     }
//     if (vm.department[3]) {
//       vm.data.mygroup = vm.department[3].id;
//       vm.isestate = true;
//       axios({
//         method: 'get',
//         url: $rootScope.baseUrl + '/api/account/departments',
//         params: {superiorId: vm.data.mygroup}
//       }).then(function successCallback(res) {
//         vm.estates = res.data.data;
//       }, function errorCallback() {
//
//       })
//     }
//     if (vm.department[4]) {
//       vm.data.myestate = vm.department[4].id;
//       axios({
//         method: 'get',
//         url: $rootScope.baseUrl + '/api/account/departments',
//         params: {superiorId: vm.data.myestate}
//       }).then(function successCallback(res) {
//         vm.wsmasters = res.data.data;
//       }, function errorCallback() {
//
//       })
//     }
//   }, function errorCallback() {
//   })
//   axios({
//       method: 'get',
//       url: $rootScope.baseUrl + '/api/account/departments',
//       params: {type: '1'}
//     }
//   ).then(function successCallback(res) {
//     vm.cities = res.data.data;
//   }, function errorCallback() {
//   })
// }
// vm.changecities = function () {
//   vm.data.myarea = null;
//   vm.data.mybranch = null;
//   vm.data.mygroup = null;
//   vm.data.myestate = null;
//   vm.isbranch = false;
//   vm.isgroup = false;
//   vm.isestate = false;
//   if (vm.data.mycity) {
//     axios({
//       method: 'get',
//       url: $rootScope.baseUrl + '/api/account/departments',
//       params: {superiorId: vm.data.mycity}
//     }).then(function successCallback(res) {
//       vm.areas = res.data.data;
//       vm.isarea = true;
//     }, function errorCallback() {
//     })
//   } else {
//     vm.isarea = false;
//   }
// }
// vm.changeareas = function () {
//   vm.data.mybranch = null;
//   vm.data.mygroup = null;
//   vm.data.myestate = null;
//   vm.isgroup = false;
//   vm.isestate = false;
//   if (vm.data.myarea == null) {
//     vm.isbranch = false;
//   } else {
//     vm.isbranch = true;
//     axios({
//       method: 'get',
//       url: $rootScope.baseUrl + '/api/account/departments',
//       params: {superiorId: vm.data.myarea}
//     }).then(function successCallback(res) {
//       vm.branches = res.data.data;
//     }, function errorCallback() {
//     })
//   }
// }
// vm.changebranch = function () {
//   vm.data.mygroup = null;
//   vm.data.myestate = null;
//   vm.isestate = false;
//   if (vm.data.mybranch == null) {
//     vm.isgroup = false;
//   } else {
//     vm.isgroup = true;
//     axios({
//       method: 'get',
//       url: $rootScope.baseUrl + '/api/account/departments',
//       params: {superiorId: vm.data.mybranch}
//     }).then(function successCallback(res) {
//       vm.groups = res.data.data;
//     }, function errorCallback() {
//     })
//   }
// }
// vm.changegroups = function () {
//   vm.data.myestate = null;
//   vm.isestate = false;
//   if (vm.data.mygroup == null) {
//     vm.isestate = false;
//   } else {
//     vm.isestate = true;
//     axios({
//       method: 'get',
//       url: $rootScope.baseUrl + '/api/account/departments',
//       params: {superiorId: vm.data.mygroup, size: 999}
//     }).then(function successCallback(res) {
//       vm.estates = res.data.data;
//     }, function errorCallback() {
//     })
//   }
// }
// vm.enterSelf = function () {
//   vm.start = 0;
//   vm.popover.hide();
//   vm.personLength = 0;
//   // if (vm.data.mycity == null) {
//   //     vm.loadMore();
//   // } else if (vm.data.myarea == null) {
//   //     axios({
//   //         method: 'get',
//   //         url: $rootScope.baseUrl + '/api/account/employees',
//   //         params: {departmentId: vm.data.mycity, size: 999, enabled: true}
//   //     }).then(function successCallback(res) {
//   //         if (res.data.data) {
//   //             vm.items = res.data.data;
//   //             vm.allPerson = res.data.total;
//   //         } else {
//   //             vm.items = [];
//   //             vm.allPerson = 0;
//   //         }
//   //     }, function errorCallback() {
//   //     })
//   // } else if (vm.data.mybranch == null) {
//   //     vm.personLength = 0;
//   //     axios({
//   //         method: 'get',
//   //         url: $rootScope.baseUrl + '/api/account/employees',
//   //         params: {departmentId: vm.data.myarea, size: 9999, enabled: true}
//   //     }).then(function successCallback(res) {
//   //         if (res.data.data) {
//   //             vm.items = res.data.data;
//   //             vm.allPerson = res.data.total;
//   //         } else {
//   //             vm.items = [];
//   //             vm.allPerson = 0;
//   //         }
//   //     }, function errorCallback() {
//   //     })
//   // } else if (vm.data.mygroup == null) {
//   //     vm.personLength = 0;
//   //     axios({
//   //         method: 'get',
//   //         url: $rootScope.baseUrl + '/api/account/employees',
//   //         params: {departmentId: vm.data.mybranch, size: 999, enabled: true}
//   //     }).then(function successCallback(res) {
//   //         if (res.data.data) {
//   //             vm.items = res.data.data;
//   //             vm.allPerson = res.data.data.length;
//   //         } else {
//   //             vm.items = [];
//   //             vm.allPerson = 0;
//   //         }
//   //     }, function errorCallback() {
//   //     })
//   // } else if (vm.data.myestate == null) {
//   //     vm.personLength = 0;
//   //     axios({
//   //         method: 'get',
//   //         url: $rootScope.baseUrl + '/api/account/employees',
//   //         params: {departmentId: vm.data.mygroup, size: 999, enabled: true}
//   //     }).then(function successCallback(res) {
//   //         if (res.data.data) {
//   //             vm.items = res.data.data;
//   //             vm.allPerson = res.data.data.length;
//   //         } else {
//   //             vm.items = [];
//   //             vm.allPerson = 0;
//   //         }
//   //     }, function errorCallback() {
//   //     })
//   // } else {
//   //     vm.personLength = 0;
//   //     axios({
//   //         method: 'get',
//   //         url: $rootScope.baseUrl + '/api/account/employees',
//   //         params: {departmentId: vm.data.myestate, size: 999, enabled: true}
//   //     }).then(function successCallback(res) {
//   //         if (res.data.data) {
//   //             vm.items = res.data.data;
//   //             vm.allPerson = res.data.data.length;
//   //         } else {
//   //             vm.items = [];
//   //             vm.allPerson = 0;
//   //         }
//   //     }, function errorCallback() {
//   //     })
//   // }
// }
  loadMore(infiniteScroll){
    let vm = this
    axios({
      method: 'get',
      url: '/api/account/user_service_maps',
      params: {
        serverId: vm.userInfo.id,
        start: vm.start
      }
    }).then(function successCallback(res) {
      vm.userLenght = res.data.total
      vm.customors = vm.customors.concat(res.data.data)
      vm.start += 1
      vm.noCustomer = !vm.customors.length;
      vm.personLength = res.data.data.length;
      if(infiniteScroll){
        infiniteScroll.complete()
      }
    })
  }
  ionViewDidLoad() {
    this.loadMore(false)
    let vm = this
    vm.sub = ['订单客户', '推荐客户'];
    vm.choosedidx = 0;
    //推荐客户
    axios({
      method: 'get',
      url: '/api/account/users?refereeId=' + vm.userInfo.id + '&size=999',
    }).then(function successCallback(res) {
      vm.recommendLenght = res.data.total;
      vm.recomend = res.data.data;
      vm.noRecommendCustomer = !res.data.data.length;
    })
  }

  chooseTab(idx) {
    this.choosedidx = idx;
  }

  goDetails(t){
    this.navCtrl.push(Customerdetailsmine, {customer: t})
  }

}
