import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';

/*
  Generated class for the Resetpw page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resetpw',
  templateUrl: 'resetpw.html'
})
export class Resetpw {
  mobile : any;
  validateCode : any;
  loginErr : any;
  veriCountDown = 0
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpwPage');
  }

  resetPw = function () {
    let vm = this
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobile))) {
      this.loginErr = '手机号码有误'
      return
    }
    let url = '/api/account/employees/reset_password'
    let config = {
      headers: {
        'Authorization': 'Basic YnJvd3Nlcjo=',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }; 
    // console.log('this is ', vm)
    let data = `mobile=${vm.mobile}&validateCode=${vm.validateCode}`                
    axios
      .post(url, data, config)
      .then(function (res) {
         vm.loginErr = ''
         alert('重置密码成功,密码已发送到您的手机上,请使用新密码登录')
         vm.mobile = ''
         vm.validateCode = ''
         vm.navCtrl.pop()
      })
      .catch(function (error) {
        alert('服务器错误');
        console.log(error);
      });
      
  }

  getVericode() {
    let vm = this
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobile))) {
      this.loginErr = '手机号码有误'
      return
    }
    let url = '/api/account/validate_code'
    let config = {
      headers: {
        'Authorization': 'Basic YnJvd3Nlcjo=',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    
    let data = `mobile=${vm.mobile}&type=1`                
    axios
      .post(url, data, config)
      .then(function (res) {
        console.log(res);
        vm.loginErr = ''
        vm.veriCountDown = 20
        var t1 = setInterval(function () {
            vm.veriCountDown = vm.veriCountDown - 1
            if (vm.veriCountDown < 0) {
                vm.veriCountDown = 0
                clearInterval(t1);
            }
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
        // this.loginErr = error.data.errorMessage
      });

  }

}
