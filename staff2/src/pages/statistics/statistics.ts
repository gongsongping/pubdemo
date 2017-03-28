import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import axios from 'axios';

/*
  Generated class for the Statistics page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html'
})
// @Pipe({
//   name: 'dateFormat'
// })
export class Statistics {
  statsAuthority: any
  cities: any = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public params: NavParams) {}

//   addtime(item, idx) {
//     let vm = this
//   // vm.toggle1 = false;
//   // vm.isactivetime = true;
//   // vm.isactivearea = true;
//   // vm.isactiveuser = true;
//   // vm.isactiveprocess = true;
//   // vm.slectIdx1 = idx;
//   if (item == '今日') {
//     startDate = $filter('date')(new Date(), 'yyyy-MM-dd');
//     endDate = $filter('date')(new Date(), 'yyyy-MM-dd');
//   } else if (item == '本周') {
//     startDate = weekStartDate;
//     endDate = $filter('date')(new Date(), 'yyyy-MM-dd');
//
//   } else if (item == '本月') {
//     startDate = monthStartDate;
//     endDate = $filter('date')(new Date(), 'yyyy-MM-dd');
//   } else {
//     startDate = $filter('date')(new Date(), 'yyyy-MM-dd');
//     endDate = $filter('date')(new Date(), 'yyyy-MM-dd');
//   }
//   if (vm.statsAuthority > 0) {
//     vm.title = res.data.department.name;
//     vm.departmentPerson();
//     vm.departmentList();
//     axios({
//       method: 'get',
//       url: '/api/mission/statistics?unitId=' + vm.userdepartmentId + '&unitType=2&dateRange=(' + startDate + ',' + endDate + ')',
//     }).then(function successCallback(res) {
//       vm.statistics = res.data.data;
//     }, function errorCallback() {
//     })
//   } else {
//     vm.title = res.data.name;
//     axios({
//       method: 'get',
//       url: '/api/mission/statistics?unitId=' + $rootScope.user_id + '&unitType=1&dateRange=(' + startDate + ',' + endDate + ')',
//     }).then(function successCallback(res) {
//       vm.statistics = res.data.data;
//     }), function errorCallback() {
//     }
//     vm.houseIdArr = [];
//     axios({
//       method: 'get',
//       url: '/api/mission/missions',
//       params: {pcId: $rootScope.user_id, status: 3}
//     }).then(function successCallback(res) {
//       vm.showingsOrder = res.data.data;
//       angular.forEach(vm.showingsOrder, function (i) {
//         vm.houseIdArr = vm.houseIdArr.concat(i.houseId);
//       })
//     }, function errorCallback() {
//     })
//   }
//   if (item) {
//     vm.date = item;
//   } else {
//     vm.date = vm.selects[0];
//   }
// }

  ionViewDidLoad() {
    let vm = this
    let startDate = '';
    let endDate = '';
    let now = new Date();
    let nowDayOfWeek = now.getDay();
    let nowDay = now.getDate();
    let nowMouth = now.getMonth();
    let nowYear = now.getFullYear();
    let datePipe = new DatePipe('en-US');
    let weekStartDate = datePipe.transform(new Date(nowYear, nowMouth, nowDay - nowDayOfWeek + 1), 'yyyy/MM/dd') ;
    let monthStartDate = datePipe.transform(new Date(nowYear, nowMouth, 1), 'yyyy/MM/dd') ;
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log(userInfo);
    let userdepartmentId = 'userInfo.department.id'

    // let userAuthority = userInfo.authorities;
    // vm.statsAuthority = userAuthority.indexOf('STATS:GROUP:R');
    // vm.mineDepart = false;
    // vm.mineperson = false;

    //部门人员
    // vm.departmentPerson = function () {
    //   let roleIdArr = [];
    //   let roleName = JSON.stringify(['置业顾问', '置业顾问经理', '房管家', '房管家经理']);
    //   axios({
    //     method: 'get',
    //     url: '/api/account/roles',
    //     params: {roleIn: roleName}
    //   }).then(function successCallback(res) {
    //     angular.forEach(res.data.data, function (i) {
    //       roleIdArr.push(i.id);
    //     })
    //     axios({
    //       method: 'get',
    //       url: '/api/account/employees',
    //       params: {departmentId: vm.userdepartmentId, roleIdIn: JSON.stringify(roleIdArr)}
    //     }).then(function successCallback(res) {
    //       vm.persons = res.data.data;
    //       vm.personsPop = res.data.data.length;
    //     }, function errorCallback() {
    //     })
    //   }, function errorCallback() {
    //   })
    // }

    //下级部门
    // vm.departmentList = function () {
    //   axios({
    //     method: 'get',
    //     url: '/api/account/departments',
    //     params: {superiorId: res.data.department.id}
    //   }).then(function successCallback(res) {
    //     vm.cities = res.data.data;
    //     vm.deparementPop = res.data.data.length;
    //   }, function errorCallback() {
    //   })
    // }





    // vm.chooseDate = function () {
    //   vm.chooseDay = !vm.chooseDay;
    //   vm.toggle1 = false;
    // }
    // vm.clickTime = function (pickedTime, pickedTimeTop) {
    //   startDate = pickedTime;
    //   endDate = pickedTimeTop;
    //   vm.chooseDay = false;
    //   if (vm.statsAuthority >= 0) {
    //     axios({
    //       method: 'get',
    //       url: '/api/mission/statistics?unitId=' + vm.userdepartmentId + '&unitType=2&dateRange=(' + startDate + ',' + endDate + ')',
    //     }).then(function successCallback(res) {
    //       vm.statistics = res.data.data;
    //       vm.date = startDate + '至' + endDate;
    //     }, function errorCallback() {
    //     })
    //   } else {
    //     axios({
    //       method: 'get',
    //       url: '/api/mission/statistics?unitId=' + $rootScope.user_id + '&unitType=1&dateRange=(' + startDate + ',' + endDate + ')',
    //     }).then(function successCallback(res) {
    //       vm.statistics = res.data.data;
    //       vm.date = startDate + '至' + endDate;
    //     }, function errorCallback() {
    //     })
    //   }
    // }
    // vm.slectIdx1 = 0;
  }

}
