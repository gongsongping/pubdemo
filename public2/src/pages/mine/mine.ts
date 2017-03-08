import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import axios from 'axios';
import { Login } from '../login/login';
import { JwtHelper } from 'angular2-jwt';



@Component({
    selector: 'page-mine',
    templateUrl: 'mine.html'
})

export class Mine {
    login = Login;
    items = [1, 2, 3, 4, 5];
    // tokens: any;
    userInfo: any;
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(public navCtrl: NavController) { }
    // ionViewDidLoad() {
    // }
    ionViewWillEnter() {
        console.log('-----mine page will enter----',this.navCtrl.parent);
        if (localStorage.getItem('userInfo')) {
            let vm = this;
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            let access_token = JSON.parse(localStorage.getItem('tokens')).access_token
            let refresh_token = JSON.parse(localStorage.getItem('tokens')).refresh_token
            console.log(this.jwtHelper.decodeToken(access_token), this.jwtHelper.getTokenExpirationDate(access_token), this.jwtHelper.isTokenExpired(access_token));
            if (this.jwtHelper.isTokenExpired(refresh_token)) {
                vm.logout()
            } else {
                if (this.jwtHelper.isTokenExpired(access_token)) {
                    let url = '/api/account/oauth/token'
                    let config = {
                        header: {
                            'Authorization': 'Basic YnJvd3Nlcjo=',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    };
                    //refresh_token: $window.localStorage.refresh_token, grant_type: 'refresh_token'
                    let data = new FormData()
                    data.append('refresh_token', refresh_token);
                    data.append('grant_type', 'refresh_token');
                    axios.post(url, data, config)
                        .then(function (res) {
                            localStorage.setItem('tokens', JSON.stringify(res.data))
                            axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.access_token
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }

        }
        console.log('mine Page will enter userInfo', this.userInfo);
    }
    ionViewDidEnter() {

    }
    logout() {
        localStorage.setItem('tokens', '')
        localStorage.setItem('userInfo', '')
        this.userInfo = ''
        // this.navCtrl.setRoot(MyApp)
        this.navCtrl.parent.select(0);
    }

}
