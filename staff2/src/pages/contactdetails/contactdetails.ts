import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the Contactdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contactdetails',
  templateUrl: 'contactdetails.html'
})
export class Contactdetails {
  staff: any
  depart: any = []
  constructor(public navCtrl: NavController, public params: NavParams) {
    let vm = this
    vm.staff = params.get('staff');
    let department = vm.staff.department
    while (department){
      vm.depart.unshift(department)
      department = department.superior
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactdetailsPage');
  }

}
