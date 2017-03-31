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
  department: any
  departmentList: any = []
  personList: any = []
  ordermine: any = Ordermine
  userInfo: any = JSON.parse(localStorage.getItem('userInfo'))
  userToken: any = JSON.parse(localStorage.getItem('tokens'))
  constructor(public navCtrl: NavController, public navParams: NavParams, public params: NavParams) {
    this.department = params.get('department');
  }

  //部门及下级部门员工,待处理订单
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

      })
    }
  }

  //部门及下级部门员工
  nextDepartment(t){
    let vm = this
    let nextDepartmentId = []
    let employer = []
    axios({
      method: 'get',
      url: '/api/account/departments/' + t.id,
    }).then(function successCallback(res) {
      nextDepartmentId = res.data.childrenIds;
      nextDepartmentId.push(t.id)
      axios({
        method: 'get',
        url: '/api/account/employees',
        params: {departmentIdIn: JSON.stringify(nextDepartmentId), size: 999, type: 1}
      }).then(function successCallback(res2) {
        // vm.nextStaffTasks(res2.data.data)

        for(let i of res2.data.data){
          employer.push(i.id)
        }
        //部门，下级部门全部订单数
        if(employer.length){
          axios({
            method: 'get',
            url: '/api/mission/missions',
            params: {
              status: 7,
              size: 0,
              pcId_OR_pcmId_OR_hkId_OR_hkmId_OR_wcId_OR_lsId_OR_nsId_OR_ctId_OR_csId_IN: JSON.stringify(employer)
            },
          }).then(function successCallback(res) {
            t.orderLength = res.data.total;
          })

          axios({
            method: 'get',
            url: '/api/mission/missions',
            params: {
              size: 0,
              pcId_OR_pcmId_OR_hkId_OR_hkmId_OR_wcId_OR_lsId_OR_nsId_OR_ctId_OR_csId_IN: JSON.stringify(employer)
            },
          }).then(function successCallback(res) {
            t.pcOrderLength = res.data.total;
          })
        }

      })
    })
  }

  //部门每个员工订单数
  orderNum(t) {
    let params = {
      pcId_OR_pcmId_OR_hkId_OR_hkmId_OR_wcId_OR_lsId_OR_nsId_OR_ctId_OR_csId: t.id,
      status:7,
      size: 0
    };
    let allParams = {
      pcId_OR_pcmId_OR_hkId_OR_hkmId_OR_wcId_OR_lsId_OR_nsId_OR_ctId_OR_csId: t.id,
      size: 0
    };
    axios({
      method: 'get',
      url: '/api/mission/missions',
      params: params,
    }).then(function successCallback(res) {
      t.Order = res.data.total;
    })
    axios({
      method: 'get',
      url: '/api/mission/missions',
      params: allParams,
    }).then(function successCallback(res) {
      t.allOrder = res.data.total;
    })
  }

  ionViewDidLoad() {
    let vm = this
    let datePipe = new DatePipe('en-US');
    let endDate = datePipe.transform(new Date(), 'yyyy-MM-dd');
    let departmentId = vm.department.id
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

  goDepart(t){
    this.navCtrl.push(Orderarea, { department: t })
  }

}
