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
  houses = []
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    let vm = this
    let url = '/api/housing/houses'
        axios
          .get(url)
          .then(function (res) {
               vm.houses = vm.houses.concat(res.data.data);
                console.log(vm.houses)
          })
          .catch(function (error) {
            alert('服务器错误');
            console.log(error);
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HouseminePage');
  }

}
