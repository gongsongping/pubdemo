import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
// IonicPage,
/**
 * Generated class for the Rent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-rent',
  templateUrl: 'rent.html',
})
export class Rent {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Rent');
  }

}
