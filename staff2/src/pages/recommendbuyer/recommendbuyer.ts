import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { MyRecommendbuyer } from '../myRecommendbuyer/myRecommendbuyer';

import axios from 'axios';

/*
  Generated class for the Recommendbuyer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recommendbuyer',
  templateUrl: 'recommendbuyer.html'
})
export class Recommendbuyer {

  userInfo:any;
  name = '';
  mobile = '';
  searchName = '';
  myRecommendbuyer: any = MyRecommendbuyer;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendbuyerPage');
  }

  ionViewDidEnter() {
    let vm = this;
    if (localStorage.getItem('userInfo')) {
      vm.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log('-----', vm.userInfo);
    } else {
      vm.userInfo = ''
    }
  }

  serviceInput() { //提交
    // let vm = this
    // let url = '/api/crm/recommends'
    // let config = {
    //   headers: {
    //     'Authorization': 'Basic YnJvd3Nlcjo=',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // };
    // let data = {
    //   referrerId: vm.userInfo.id
    // }                
    // axios
    //   .post(url, data, config)
    //   .then(function (res) {
    //     console.log(res)
    //   })
    //   .catch(function (error) {
    //     alert('错误');
    //     console.log(error);
    //   });
  }
  clearInputName() {
    this.name = ''
  }
  clearInputMobile() {
    this.mobile = ''
  }
  pushBuyer(h) {
    this.navCtrl.push(h);
  }
  presentModal() {
    // let modal = this.modalCtrl.create(Modaldistrict,{id:999});
    // modal.present();
  }
}
