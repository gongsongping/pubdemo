import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import axios from 'axios';
/*
  Generated class for the Sellrecord page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sellrecord',
  templateUrl: 'sellrecord.html'
})
export class Sellrecord {

  houseNone = '暂无数据';
  record:any;
  total:any;
  userInfo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellrecordPage');
    if (localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log('-----', this.userInfo);
    } else {
      this.userInfo = ''
    }
  }
  ionViewWillEnter(){
    let vm = this;
    let url = '/api/mission/missions?type=3&supplierId=' + vm.userInfo.id;
    axios.get(url)
      .then(function (res) {
        console.log(res)
        vm.total = res.data.total
        vm.record = res.data.data;
      })
  }
}
