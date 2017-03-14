import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import axios from 'axios';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class Login {
    mobile: any;
    validateCode: any;
    loginErr: any;
    veriCountDown = 0
    constructor(public navCtrl: NavController, public events:Events) { }

    ionViewWillEnter() {
        console.log('---- LoginPage Page will enter-----',this.navCtrl.parent);
    }
    ngOnInit(){
        console.log('----- LoginPage Page oninit------');
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
        axios.post(url, data, config)
            .then(function (res) {
                vm.loginErr = ''
                vm.veriCountDown = 30
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
    login() {
        let vm = this
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobile))) {
            this.loginErr = '手机号码有误'
            return
        }
        let url = '/api/account/users'
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
       
        let data = `mobile=${vm.mobile}&validateCode=${vm.validateCode}`
        axios.post(url, data, config)
            .then(function (res) {
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                //get access_token
                let url2 = '/api/account/oauth/token'
                let config2 = {
                    headers: {
                        'Authorization': 'Basic YnJvd3Nlcjo=',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                
                let data2 = `username=${vm.mobile}&password=${vm.validateCode}&scope=ui&grant_type=password`                
                axios.post(url2, data2, config2)
                    .then(function (res) {
                        localStorage.setItem('tokens', JSON.stringify(res.data))
                        axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.access_token
                        vm.events.publish('messages:update')
                        vm.navCtrl.pop()
                        // vm.navCtrl.popToRoot()
                    })
                    .catch(function (error) {
                        alert('手机号或验证码错误');                        
                        console.log(error);
                    });

            })
            .catch(function (error) {
                alert('手机号或验证码错误');
                console.log(error);
            });
    }

}
