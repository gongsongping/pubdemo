import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the HouseDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-house-detail',
  templateUrl: 'house-detail.html'
})
export class HouseDetail {
  house:any;
  constructor(public navCtrl: NavController,public params: NavParams) {
       this.house = params.get('house')
  }

  ionViewDidLoad() {
    console.log('Hello HouseDetailPage Page',this.house);
  }

}
