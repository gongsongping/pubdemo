import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Newrecord page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-newrecord',
  templateUrl: 'newrecord.html'
})
export class Newrecord{
  userInfo: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public params: NavParams) {
    this.userInfo = params.get('userInfo')
    console.log(this.userInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewrecordPage');
  }

}
