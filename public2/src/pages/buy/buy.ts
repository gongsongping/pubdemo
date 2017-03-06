import { Component, ViewChild } from '@angular/core';
import { NavController,Tabs } from 'ionic-angular';
import { Precise } from '../precise/precise';
import { Login } from '../login/login';

/*
  Generated class for the Buy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html'
})
export class Buy {
  @ViewChild('myTabs') tabRef: Tabs;
  // userInfo:any;
  precise = Precise
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    this.tabRef.select(1);
    console.log('Hello BuyPage Page');
  }
  ionViewWillEnter() {
    // this.userInfo = window.localStorage.getItem('userInfo')
    console.log('Hello BuyPage Page');
  }
  goPrecise(){
    if (window.localStorage.getItem('tokens')){
       this.navCtrl.push(Precise)
    } else {
       this.navCtrl.push(Login)      
    }
  }

}
