import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Districtdetails } from '../districtdetails/districtdetails';

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

    ionViewDidLoad() {
        // this.doInfinite(false);
        console.log('ionViewDidLoad HousesearchPage');
    }

    ionViewWillEnter() {
        // this.roleName = localStorage.getItem('role')
    }

    districtDs(d){
        this.navCtrl.push(Districtdetails, { house: d })
    }
    action () {
        this.isAction = !this.isAction
    }
}


