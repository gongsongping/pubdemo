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

    ionViewWillEnter() {
        if (localStorage.getItem('userInfo')){
            this.userInfo = localStorage.getItem('userInfo')
        } else {
            this.userInfo = ''
        }
        console.log('----mine Page will enter userInfo-----', this.userInfo);
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
