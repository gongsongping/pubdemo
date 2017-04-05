import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';
import { Housemine } from '../housemine/housemine';
/*
  Generated class for the Housemanagement page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-housemanagement',
    templateUrl: 'housemanagement.html'
})
export class Housemanagement {

    housemine = Housemine;
    userId: any;
    managementRole = [];
    managementUser:any;
    // superiorName: any;
    // superiorRole: any;
    rentTotal: any;
    houseTotal: any;
    roleId: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HousemanagementPage');
    }

    ionViewWillEnter() {
        let vm = this;
        vm.userId = vm.navParams.get('userId');
        axios
            .get('/api/account/employees/' + vm.userId)
            .then(function (res) {
                vm.managementRole = res.data;
                vm.roleId = res.data.id;
                console.log(vm.managementRole)
                axios
                    .get('/api/housing/houses?size=10&hkId=' + vm.roleId)
                    .then(function (res) {
                        vm.houseTotal = res.data.total;
                    })
                axios
                    .get('/api/housing/rents?size=10&hkId=' + vm.roleId)
                    .then(function (res) {
                        vm.rentTotal = res.data.total;
                    })
            })
        axios
            .get('/api/account/employees?superiorId=' + vm.userId)
            .then(function (res) {
                vm.managementUser = res.data;
            })
    }
    pushManagement() {
        this.navCtrl.push(Housemanagement, { userId: this.roleId });
    }
}
