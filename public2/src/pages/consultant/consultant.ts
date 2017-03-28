import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import axios from 'axios';
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

  serviceType = 1;
  myUsers: any;
  userInfo: any;
  totals: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ConsultantPage');
    if (localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log('-----', this.userInfo);
      this.contentltan();
    } else {
      this.userInfo = ''
    }
  }


  subtabs = [{ title: '置业顾问', type: 1 }, { title: '房管家', type: 2 }]

  contentltan() {
    let vm = this;
    let url = '/api/account/user_service_maps?userId=' + vm.userInfo.id + '&serviceType=' + vm.serviceType
    axios.get(url)
      .then(function (res) {
        vm.totals = res.data.total
        vm.myUsers = res.data.data;
        console.log(vm.myUsers)
      })
  }
  chooseTab(t) {
    this.serviceType = t.type;
    this.contentltan();
  }
}
