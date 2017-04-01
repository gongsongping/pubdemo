import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import axios from 'axios';
/*
  Generated class for the Application page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-application',
  templateUrl: 'application.html'
})
export class Application {
  
  selections = false;
  searchInput = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationPage');
  }

  presentModal() {
    this.initializeItems();
    this.selections = true;
  }
  presentCancel() {
    this.selections = false;
  }
  searchQuery: string = '';
  items: any;


  initializeItems() {
    let vm = this;
    let url = 'api/housing/subdistricts'
    axios.get(url)
      .then(function (res) {
        console.log(res)
        vm.items = res.data.data;
      })
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
  chooseItem(i) {
    this.searchInput = i.name;
  }
}
