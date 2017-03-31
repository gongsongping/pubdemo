import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Customermine } from '../customermine/customermine';
import axios from 'axios'
/*
  Generated class for the Customerarea page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customerarea',
  templateUrl: 'customerarea.html'
})
export class Customerarea {
  department: any
  departmentList: any = []
  personList: any = []
  customermine: any = Customermine
  constructor(public navCtrl: NavController, public navParams: NavParams, public params: NavParams) {
    this.department = params.get('department')
  }

  //部门以及下级部门客户数
  nextDepartment(t){
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
        for(let i of res2.data.data){
          employer.push(i.id)
        }
        // console.log(employer);
        axios({
          method: 'get',
          url:'/api/account/user_service_maps',
          params: {serverIdIn: JSON.stringify(employer)}
        }).then(function successCallback(res) {
          let departmentLenght = res.data.total;
          axios({
            method: 'get',
            url: '/api/account/users?refereeIdIn=' + JSON.stringify(employer) + '&size=999',
          }).then(function successCallback(res) {
            t.total = departmentLenght + res.data.total
          })
        })
      })
    })
  }

  //员工客户数
  orderNum(t){
    axios({
      method: 'get',
      url: '/api/account/user_service_maps',
      params: {serverId: t.id, size: 999}
    }).then(function successCallback(res) {
      let missionLenght = res.data.total
      axios({
        method: 'get',
        url: '/api/account/users?refereeId=' + t.id + '&size=999',
      }).then(function successCallback(res) {
        t.total = missionLenght + res.data.total
      })
    }, function errorCallback() {
    })
  }

  ionViewDidLoad() {
    let vm = this
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
    this.navCtrl.push(Customermine, { staff: t })
  }

  goDepart(t){
    this.navCtrl.push(Customerarea, { department: t })
  }
}
