import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import axios from 'axios';
import { Login } from '../login/login';
import { JwtHelper } from 'angular2-jwt';
import { About } from '../about/about';
import { Consultant } from '../consultant/consultant';
import { Servicecall } from '../servicecall/servicecall';
import { Visitrecord } from '../visitrecord/visitrecord';
import { Sellrecord } from '../sellrecord/sellrecord';


@Component({
    selector: 'page-mine',
    templateUrl: 'mine.html'
})

export class Mine {
    login = Login;
    about = About
    consultant = Consultant
    servicecall = Servicecall
    visitrecord = Visitrecord
    sellrecord = Sellrecord

    items = [1, 2, 3, 4, 5];
    // tokens: any;
    userInfo: any;
    messagesTotal:any = 0

    jwtHelper: JwtHelper = new JwtHelper();
    constructor(public navCtrl: NavController, public events:Events) { }

    ionViewWillEnter() {
        let vm = this
        if (localStorage.getItem('userInfo')){
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        } else {
            this.userInfo = ''
        }
        setTimeout(()=>{
            vm.messagesTotal = localStorage.getItem('messagesTotal')
            console.log('----mine-page-messagesTotal----',vm.messagesTotal);
        },500)
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
    goTo(p){
        if (window.localStorage.getItem('tokens')){
            this.navCtrl.push(p)
        } else {
            this.navCtrl.push(Login)      
        }
    }

}
