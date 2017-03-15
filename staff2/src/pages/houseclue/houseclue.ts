import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Houseclue page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-houseclue',
  templateUrl: 'houseclue.html'
})
export class Houseclue {
  height:string
  showHeight = false
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HousecluePage');
  }
  chooseDistrict(){
    //  this.height = '500px'
    this.showHeight = true
  }
  closeDistrict(){
    //  this.height = '500px'
    this.showHeight = false
  }
}
