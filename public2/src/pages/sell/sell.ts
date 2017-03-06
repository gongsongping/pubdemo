import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { NestedCom, NestedContent } from '../../providers/nested-com';

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
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SellPage Page');
  }
  onNotify(message:any) {
    alert(message);
  }
}
