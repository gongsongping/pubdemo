import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';

/*
  Generated class for the Changepw page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-changepw',
  templateUrl: 'changepw.html'
})
export class Changepw {
  oldpw:string
  newpw1:string
  newpw2:string
  loginErr:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepwPage');
  }
  changePw() {
    // console.log(vm)
    let vm = this
    if (vm.oldpw.length < 6 || vm.newpw1.length < 6 || vm.newpw2.length < 6) {
        vm.loginErr = '密码不能少于六位'
        return
    }
    if (vm.newpw1 !== vm.newpw2) {
        vm.loginErr = '两次输入的新密码不相等'
        return
    }
    let data = new FormData()
    data.append('curPwd', vm.oldpw)
    data.append('newPwd', vm.newpw1)
    let url = '/api/account/employees/change_password'
    let config = {
      headers: {
            // 'Authorization': 'Basic YnJvd3Nlcjo=',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    axios.post(url,data,config)
        .then(function () {
            vm.oldpw = ''
            vm.newpw1 = ''
            vm.newpw2 = ''
            vm.loginErr = ''
            vm.navCtrl.pop()
        })
        .catch( function(error) {
            console.log(error);
            alert('密码不正确')
            // vm.loginErr = error.errorMessage
        })
  }
}
