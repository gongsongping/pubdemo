import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import axios from 'axios';
/*
  Generated class for the Districtdetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-districtdetails',
  templateUrl: 'districtdetails.html'
})
export class Districtdetails {
  house:any;
  subdistricts = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
        let vm = this;
        vm.house = navParams.get('house')
        let url = 'api/housing/subdistricts/' + vm.house.id
        axios
            .get(url)
            .then(function (res) {
                vm.subdistricts = res.data;
              console.log(vm.subdistricts)
            })
            .catch(function (error) {
                alert('服务器错误');
                console.log(error);
            });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistrictdetailsPage');
  }

}
