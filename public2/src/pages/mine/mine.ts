import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

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
    messagesTotal:any = 0

    jwtHelper: JwtHelper = new JwtHelper();
    constructor(public navCtrl: NavController, public events:Events) { }

    ionViewWillEnter() {
        this.userInfo = localStorage.getItem('userInfo')
    }
    ionViewDidEnter() {
        this.messagesTotal = localStorage.getItem('messagesTotal')
        console.log('----mine Page will enter userInfo-----', this.userInfo);
    }
    logout() {
        localStorage.setItem('tokens', '')
        localStorage.setItem('userInfo', '')
        localStorage.setItem('messagesTotal','')
        this.userInfo = ''
        delete axios.defaults.headers.common["Authorization"]
        this.events.publish('messages:update')
        // this.navCtrl.setRoot(MyApp)
        this.navCtrl.parent.select(0);
    }

}
