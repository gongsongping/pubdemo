import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';

/*
  Generated class for the Housesearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-housesearch',
  templateUrl: 'housesearch.html'
})
export class Housesearch {
  houses = []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
    this.houseSearch();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HousesearchPage');
  }

  searchQuery: string = '';
  items: string[];

  

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
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

  houseSearch() {
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
}

