import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Districtdetails } from '../districtdetails/districtdetails';

declare var BMap: any;

/*
  Generated class for the Housedetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-housedetails',
    templateUrl: 'housedetails.html'
})
export class Housedetails {

    userInfo: any;
    house: any;
    isAction = false;
    constructor(public navCtrl: NavController, public Params: NavParams) {
        this.house = Params.get('house')
    }

    ionViewDidEnter() {
        // this.doInfinite(false);
        console.log('ionViewDidEnter HousesearchPage');
        let map = new BMap.Map("housedetails-map");
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

    ionViewWillEnter() {
        // this.roleName = localStorage.getItem('role')
    }

    goDistrict(d){
        this.navCtrl.push(Districtdetails, { house: d })
    }
    action () {
        this.isAction = !this.isAction
    }
}


