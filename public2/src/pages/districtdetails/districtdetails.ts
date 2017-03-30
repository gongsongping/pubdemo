import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
declare var BMap: any

@Component({
    selector: 'page-districtdetails',
    templateUrl: 'districtdetails.html'
})
export class Districtdetails {
    subdistrict: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.subdistrict = navParams.get('subdistricts')
        console.log(this.subdistrict)
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter DistrictdetailsPage');
        let map = new BMap.Map("details-map");
        if (this.subdistrict.longitude) {
            console.log(this.subdistrict.longitude, this.subdistrict.latitude)
            let point = new BMap.Point(this.subdistrict.longitude, this.subdistrict.latitude);
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

