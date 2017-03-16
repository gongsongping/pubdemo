import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';

/*
  Generated class for the Housemine page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-housemine',
  templateUrl: 'housemine.html'
})
export class Housemine {
  houses = [];
  houseTitle = [];
  totalShelves = '';
  totalAll = '';
  total = '';
  statusIn = '&statusIn=[2]';
  selectTab = 0;
  userInfo: any;
  choosedTab = 10;
  searchData = {input:''}
  subtabs = [{ id: 0, title: '价格' }, { id: 1, title: '户型' }, { id: 2, title: '钥匙' }, { id: 3, title: '更多' }]
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HouseminePage');
  }
  ionViewDidEnter() {
    let vm = this;
    vm.selectTab = 0;
    if (localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log('-----', this.userInfo);
      this.totalMessages();
      this.housemineData();
    } else {
      this.userInfo = ''
    }
  }
  totalMessages() {
    console.log(this.userInfo);
    let vm = this
    let url = '/api/housing/houses?size=10&hkId=' + this.userInfo.id
    axios
      .get(url + '&statusIn=[2]')
      .then(function (res) {
        vm.totalShelves = res.data.total;
        axios
          .get(url)
          .then(function (res) {
            vm.totalAll = res.data.total;
            vm.houseTitle = [{ id: 0, name: '在售房源', total: vm.totalShelves, status: '[2]' }, { id: 1, name: '所有房源', total: vm.totalAll, status: '[0,1,2,3,4,5]' }];
          })
          .catch(function (error) {
            alert('服务器错误');
            console.log(error);
          });
      })
      .catch(function (error) {
        alert('服务器错误');
        console.log(error);
      });
  }
  selectStatus(m, n) {
    let vm = this;
    vm.selectTab = m;
    vm.choosedTab = 10;
    vm.houses = [];
    vm.statusIn = '&statusIn=' + n;
    vm.housemineData();
  }
  housemineData() {
    let vm = this
    let url = '/api/housing/houses?size=10&hkId=' + this.userInfo.id
    axios
      .get(url + vm.statusIn)
      .then(function (res) {
        vm.houses = vm.houses.concat(res.data.data);
        console.log(vm.houses)
      })
      .catch(function (error) {
        alert('服务器错误');
        console.log(error);
      });
  }
  chooseTab(t) {
    let vm = this;
    vm.choosedTab = t;
  }
  focus(){

  }
  blur(){

  }
  searchDis(){

  }
  inputSearch(){

  }
}
