import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Housedetails } from '../housedetails/housedetails';

import axios from 'axios';
/*
  Generated class for the Housedetailsedit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-housedetailsedit',
  templateUrl: 'housedetailsedit.html'
})
export class Housedetailsedit {

  housedetails: any = Housedetails;
  house: any;
  isBg: any;
  hasKeys: any;
  isBgDe: any;
  decorates: any;
  isBgOr: any;
  orientation: any;
  houseType: any;
  detailAddr: any;
  regionId: any;
  houseId: any;
  owner: any;
  ownerName: any;
  subdistrictName: any;
  roleName: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    let vm = this;
    vm.house = navParams.get('house')
    vm.houseType = String(vm.house.houseType);
    vm.detailAddr = String(vm.house.detailAddr);
    vm.hasKeys = vm.house.hasKey;
    vm.decorates = vm.house.decorate;
    vm.orientation = vm.house.orientation;
    vm.regionId = vm.house.regionId;
    vm.houseId = vm.house.id;
    vm.owner = vm.house.supplierId;
    vm.houseType = vm.houseType.split('-')
    vm.detailAddr = vm.detailAddr.split('-')
    vm.house.room = Number(vm.houseType[0]);
    vm.house.building = Number(vm.detailAddr[0]);
    vm.house.unit = Number(vm.detailAddr[1]);
    vm.house.floors = Number(vm.detailAddr[2]);
    if (vm.houseType[1] == 'undefined' || vm.houseType[1] == '') {
      vm.house.hall = Number(0)
    } else {
      vm.house.hall = Number(vm.houseType[1])
    }
    if (vm.houseType[2] == 'undefined' || vm.houseType[2] == '') {
      vm.house.kitchen = Number(0)
    } else {
      vm.house.kitchen = Number(vm.houseType[2])
    }
    if (vm.houseType[3] == 'undefined' || vm.houseType[3] == '') {
      vm.house.bathroom = Number(0)
    } else {
      vm.house.bathroom = Number(vm.houseType[3])
    }
    axios
      .get('/api/account/users/' + vm.house.supplierId)
      .then(function (res) {
        console.log(res)
        vm.ownerName = res.data.name;
      })
    console.log(navParams.get('house'))
  }
  ionViewWillEnter() {
    this.roleName = localStorage.getItem('role');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HousedetailseditPage');
  }


  //钥匙
  hasKey = [
    { value: true, name: '有钥匙' }, { value: false, name: '无钥匙' }
  ]
  addBg() {
    this.isBg = !this.isBg
  }
  checkInKey(i) {
    this.isBg = false;
    this.hasKeys = i.value;
  }
  //装修
  decorate = [
    { id: 1, name: '毛坯' }, { id: 2, name: '简装' }, { id: 3, name: '精装' }
  ]
  addBgDe() {
    this.isBgDe = !this.isBgDe
  }
  checkIn(i) {
    this.isBgDe = false;
    this.decorates = i.id
  }
  //朝向
  orientations = [
    { id: 1, name: '西' }, { id: 2, name: '东' }, { id: 3, name: '北' }, { id: 4, name: '南' }, { id: 5, name: '南北' }
  ]
  addBgOr() {
    this.isBgOr = !this.isBgOr
  }
  checkInOrientation(i) {
    this.isBgOr = false;
    this.orientation = i.id
  }
  houseEdit() {
    let vm = this
    let url = ''
    if (vm.roleName == '房管家') {
      url = '/api/housing/houses/' + vm.house.id
    }
    if (vm.roleName == '租赁专员') {
      url = '/housing/rents/' + vm.house.id
    }
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    let data = '&name=' + vm.house.name + '&price=' + vm.house.price + '&hasKey=' + vm.hasKeys + '&description=' + vm.house.description + '&orientation=' + vm.orientation + '&detailAddr=' + vm.house.building + '-' + vm.house.unit + '-' + vm.house.floors + '&houseType=' + vm.house.room + '-' + vm.house.hall + '-' + vm.house.kitchen + '-' + vm.house.bathroom + '&floor=' + vm.house.floor + '&totalFloor=' + vm.house.totalFloor + '&buildingArea=' + vm.house.buildingArea + '&decorate=' + vm.decorates;
    axios
      .put(url, data, config)
      .then(function (res) {
        let url1 = '/api/account/users/' + vm.house.supplierId;
        let data1 = '&name=' + vm.ownerName;
        axios
          .put(url1, data1, config)
          .then(function (res) {
            vm.showAlert()
          })
          .catch(function (error) {
            alert('错误');
            console.log(error);
          });
      })
      .catch(function (error) {
        alert('错误');
        console.log(error);
      });
  }
  showAlert() {
    let vm = this;
    let alert = this.alertCtrl.create({
      title: '编辑成功',
      subTitle: '确认后返回房源管理查看',
      buttons: [
        {
          text: '确认',
          handler() {
            vm.navCtrl.pop(Housedetails)
          }
        }
      ]
    });
    alert.present();
  }
}
