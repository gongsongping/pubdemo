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

  ionViewDidLoad() {
    let vm = this
    let departmentId = vm.department.id
    //下级部门
    axios({
      method: 'get',
      url: '/api/account/departments',
      params: {superiorId: departmentId}
    }).then(function successCallback(res) {
      if (res.data.data.length && res.data.data[0].type != 12) {
        vm.departmentList = res.data.data;
        for(let i of vm.departmentList){
          // vm.nextDepartment(i)
        }
      } else {
        axios({
          method: 'get',
          url: '/api/account/employees?type=1&departmentId=' + departmentId,
        }).then(function successCallback(res) {
          vm.personList = res.data.data;
          for(let t of vm.personList ){
            // vm.orderNum(t)
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
