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

  userInfo: any;
  name = '';
  mobile = '';
  searchName = '';
  selections = false;
  searchInput = '';
  myRecommendbuyer: any = MyRecommendbuyer;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.initializeItems();
  }

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
    this.selections = true;
  }
  presentCancel() {
    this.selections = false;
  }
  searchQuery: string = '';
  items: any;


  initializeItems() {
    let vm = this;
    let url = 'api/housing/subdistricts'
    axios.get(url)
      .then(function (res) {
        console.log(res)
        vm.items = res.data.data;
      })
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  chooseItem(i){
    this.searchInput = i.name;
  }
}

