import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
// import { ModalPage } from './modal-page'; //模态窗口
import { MyRecommendbuyer } from '../myRecommendbuyer/myRecommendbuyer';

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
  name = '';
  mobile = '';
  searchName = '';
  myRecommendbuyer: any = MyRecommendbuyer;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommendbuyerPage');
  }
  serviceInput() { //提交

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
  // presentModal() {
  //   let modal = this.modalCtrl.create(ModalPage);
  //   modal.present();
  // }
}
