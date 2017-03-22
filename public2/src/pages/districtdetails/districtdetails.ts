import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import axios from 'axios';

declare var BMap:any

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
        let url = 'api/housing/subdistricts/' + vm.house.subdistrict.id
        axios.get(url)
            .then(function (res) {
                vm.subdistricts = res.data;
                console.log(vm.subdistricts)
            })
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter DistrictdetailsPage');
    let map = new BMap.Map("details-map");
    if (this.house.subdistrict.longitude) {
        console.log(this.house.subdistrict.longitude, this.house.subdistrict.latitude)
        let point = new BMap.Point(this.house.subdistrict.longitude, this.house.subdistrict.latitude);
        let mk = new BMap.Marker(point);
        map.addOverlay(mk);
        // map.panTo(point);
        map.centerAndZoom(point, 18);
        // mk.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    } else {
        map.centerAndZoom("北京", 12);
    }
    map.enableScrollWheelZoom(true);
  }

}

