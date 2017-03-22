import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Consultant page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-consultant',
  templateUrl: 'consultant.html'
})
export class Consultant {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultantPage');
  }
  tabs = ['置业顾问','房管家']
  activeTab = 0
  chooseTab (i){
    this.activeTab = i
  }
}
