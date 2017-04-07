import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import axios from 'axios';
/*
  Generated class for the MyRecommendbuyer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-myRecommendbuyer',
  templateUrl: 'myRecommendbuyer.html'
})
export class MyRecommendbuyer {
  users:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRecommendbuyerPage', this.users);
  }
  ionViewWillEnter(){
      this.users = this.navParams.get('staff');
      this.telPhoto();
  }
  telPhoto() {
    let vm = this;
    let url = '/api/crm/recommends?referrerId=' + this.users.id + '&type=1'
    axios
      .get(url)
      .then(function (res) {
        console.log(res)
        // vm.total = res.data.total;
        // vm.messages = vm.messages.concat(res.data.data);
      })
  }
}
