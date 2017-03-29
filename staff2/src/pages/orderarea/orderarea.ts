import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { Ordermine } from '../ordermine/ordermine';
import axios from 'axios';
/*
  Generated class for the Orderarea page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-orderarea',
  templateUrl: 'orderarea.html'
})
export class Orderarea {
  departmentList: any = []
  personList: any = []
  ordermine: any = Ordermine
  userInfo: any = JSON.parse(localStorage.getItem('userInfo'))
  userToken: any = JSON.parse(localStorage.getItem('tokens'))
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  //子级部门员工
  nextDepartment(t){
    let vm = this
    let nextDepartmentId = []
    let staffDepartment = []
    axios({
      method: 'get',
      url: '/api/account/departments/' + t.id,
    }).then(function successCallback(res) {
      //所有下级部门id
      nextDepartmentId = res.data.childrenIds;
      axios({
        method: 'get',
        url: '/api/account/employees',
        params: {departmentIdIn: JSON.stringify(nextDepartmentId), size: 999, type: 1}
      }).then(function successCallback(res2) {
        // vm.nextStaffTasks(res2.data.data)
        // console.log(res2.data.data);

        for(let i of res2.data.data){
          let bs64 = window.btoa(vm.userInfo.username + ':' + vm.userToken.access_token);
          axios({
            method: 'POST',
            headers: {"Authorization": "Basic " + bs64},
            url: '/api/activiti/query/tasks',
            data: {
              assignee: t.id,
              size: 0,
              order: 'desc',
            }
          }).then(function successCallback(res) {

            // while (i.department){
            //   staffDepartment.push(i.department.id)
            //   i.department = i.department.superior
            // }
          })
        }
      })
    })
  }

  //子级部门员工待处理订单
  nextStaffTasks(t){
    for(let i of t){
      let vm = this
      let bs64 = window.btoa(vm.userInfo.username + ':' + vm.userToken.access_token);
      axios({
        method: 'POST',
        headers: {"Authorization": "Basic " + bs64},
        url: '/api/activiti/query/tasks',
        data: {
          assignee: t.id,
          size: 0,
          order: 'desc',
        }
      }).then(function successCallback(res) {
        // console.log(res.data);
          if(true){

        }
      })
    }
  }

  //子级员工全部订单数量
  orderNum(t) {
    var params = {
      pcId_OR_pcmId_OR_hkId_OR_hkmId_OR_wcId_OR_lsId_OR_nsId_OR_ctId_OR_csId: t.id,
      size: 0
    };
    axios({
      method: 'get',
      url: '/api/mission/missions',
      params: params,
    }).then(function successCallback(res) {
      t.allOrder = res.data.total;
    })
    //待处理
    // axios({
    //   method: 'get',
    //   url: '/api/mission/statistics?unitId=' + t.id + '&unitType=1&dateRange=(2016-01-01' + ',' + vm.endDate + ')',
    // }).then(function successCallback(res) {
    //   var staff = res.data.data[0];
    //   if (res.data.data.length) {
    //     var allOrderLength = staff.applyForWatchHouseCount + staff.applyForHousePutOnSaleCount + staff.applyForByHouseCount + staff.applyForMortgageCount + staff.applyForNetSignedCount + staff.applyForTransferCount;
    //     var cancelOrder = staff.cancelWathcHouseCount + staff.cancelHousePutOnSaleCount + staff.cancelByHouseCount + staff.cancelMortgageCount + staff.cancelNetSignedCount + staff.cancelTransferCount;
    //     var finishOrder = staff.watchHouseCount + staff.housePutOnSaleCount + staff.turnoverCount + staff.mortgageCount + staff.netSignedCount + staff.transferCount;
    //     var missOrder = staff.leftUnfinishedWatchHouseCount + staff.leftUnfinishedHousePutOnSaleCount + staff.leftUnfinishedByHouseCount + staff.leftUnfinishedMortgageCount + staff.leftUnfinishedNetSignedCount + staff.leftUnfinishedTransferCount;
    //     t.unfinish = allOrderLength + missOrder - cancelOrder - finishOrder;
    //   }
    // })
  }

  ionViewDidLoad() {
    let vm = this
    let datePipe = new DatePipe('en-US');
    let endDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
    let departmentId = vm.userInfo.department.id
    //下级部门
    axios({
      method: 'get',
      url: '/api/account/departments',
      params: {superiorId: departmentId}
    }).then(function successCallback(res) {
      if (res.data.data.length && res.data.data[0].type != 12) {
        vm.departmentList = res.data.data;
        for(let i of vm.departmentList){
          vm.nextDepartment(i)
        }

        // vm.departmentNum = function (t) {
        //   var employee = [];
        //   axios({
        //     method: 'get',
        //     url: '/api/account/departments/' + t.id,
        //   }).then(function successCallback(res) {
        //     var nextDepartmentId = res.data.childrenIds;
        //     nextDepartmentId.push(t.id);
        //     axios({
        //       method: 'get',
        //       url: '/api/account/employees',
        //       params: {departmentIdIn: JSON.stringify(nextDepartmentId), size: 999, type: 1}
        //     }).then(function successCallback(res) {
        //       // console.log(res.data.data);
        //       angular.forEach(res.data.data, function (i) {
        //         employee.push(i.id)
        //         //部门待处理订单数量
        //         // axios({
        //         //     method: 'POST',
        //         //     headers: {"Authorization": "Basic " + bs64},
        //         //     url: '/api/activiti/query/tasks',
        //         //     data: {
        //         //         assignee: i.id,
        //         //         size: 0,
        //         //         order: 'desc',
        //         //     }
        //         // }).then(function successCallback(res2) {
        //         //     console.log(res2.data);
        //         //
        //         //     // t.unfinish = res2.data.total;
        //         // }, function errorCallback(res) {
        //         //
        //         // })
        //       })
        //
        //       //部门全部订单数量
        //       axios({
        //         method: 'get',
        //         url: '/api/mission/missions',
        //         params: {
        //           size: 0,
        //           pcId_OR_pcmId_OR_hkId_OR_hkmId_OR_wcId_OR_lsId_OR_nsId_OR_ctId_OR_csId_IN: JSON.stringify(employee)
        //         },
        //       }).then(function successCallback(res) {
        //         t.pcOrderLength = res.data.total;
        //       }, function errorCallback() {
        //       })
        //
        //     }, function errorCallback() {
        //     })
        //   }, function errorCallback() {
        //   })
        //   axios({
        //     method: 'get',
        //     url: '/api/mission/statistics?unitId=' + t.id + '&unitType=2&dateRange=(2016-01-01' + ',' + vm.endDate + ')',
        //   }).then(function successCallback(res) {
        //     var staff = res.data.data[0];
        //     var allOrderLength = staff.applyForWatchHouseCount + staff.applyForHousePutOnSaleCount + staff.applyForByHouseCount + staff.applyForMortgageCount + staff.applyForNetSignedCount + staff.applyForTransferCount;
        //     var cancelOrder = staff.cancelWathcHouseCount + staff.cancelHousePutOnSaleCount + staff.cancelByHouseCount + staff.cancelMortgageCount + staff.cancelNetSignedCount + staff.cancelTransferCount;
        //     var finishOrder = staff.watchHouseCount + staff.housePutOnSaleCount + staff.turnoverCount + staff.mortgageCount + staff.netSignedCount + staff.transferCount;
        //     var missOrder = staff.leftUnfinishedWatchHouseCount + staff.leftUnfinishedHousePutOnSaleCount + staff.leftUnfinishedByHouseCount + staff.leftUnfinishedMortgageCount + staff.leftUnfinishedNetSignedCount + staff.leftUnfinishedTransferCount;
        //     t.unfinish = allOrderLength + missOrder - cancelOrder - finishOrder;
        //   }, function errorCallback() {
        //   })
        // }

      } else {
        axios({
          method: 'get',
          url: '/api/account/employees?type=1&departmentId=' + departmentId,
        }).then(function successCallback(res) {
          vm.personList = res.data.data;
          for(let t of vm.personList ){
            vm.orderNum(t)
          }
        })


      }
    })
  }

  goOrder(t){
    this.navCtrl.push(Ordermine, { staff: t })
  }

}
