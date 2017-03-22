import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Orderdetailsmine page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-orderdetailsmine',
  templateUrl: 'orderdetailsmine.html'
})
export class Orderdetailsmine {
  mission: any
  constructor(public navCtrl: NavController, public params: NavParams) {
    let vm = this
    vm.mission = params.get('mission');
  }

  loadMore(){
    console.log(1);
  }

  ionViewDidLoad() {
    let vm = this
    console.log('ionViewDidLoad OrderdetailsminePage');
  }

}
