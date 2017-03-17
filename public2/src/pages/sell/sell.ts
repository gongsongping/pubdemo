import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { NestedCom, NestedContent } from '../../providers/nested-com';

import { Sellcommission } from '../sellcommission/sellcommission';
import { Sellrecord } from '../sellrecord/sellrecord';
import { Login } from '../login/login';
/*
  Generated class for the Sell page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html'
})
export class Sell {
  title:any = 'title from parent'
  sellcommission = Sellcommission
  sellrecord = Sellrecord
  
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SellPage Page');
  }
  onNotify(message:any) {
    alert(message);
  }
  goTo(p){
    if (window.localStorage.getItem('tokens')){
       this.navCtrl.push(p)
    } else {
       this.navCtrl.push(Login)      
    }
  }
}
