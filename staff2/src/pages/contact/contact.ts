import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contactdetails } from '../contactdetails/contactdetails';
import axios from 'axios';



/*
  Generated class for the Contact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class Contact {
  person = [];
  start = 0;
  dataLength = 10;
  housesTotal: any
  allPerson: any
  contactdetails:any = Contactdetails
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  loadMore(infiniteScroll) {
    axios.defaults.baseURL = 'http://60.205.169.195:7060';
    let vm = this
    let params = {
      params: {
        start: vm.start,
        enabled: true,
      }
    }
    axios.get('/api/account/employees', params)
      .then(function (res) {
        vm.person = vm.person.concat(res.data.data);
        vm.allPerson = res.data.total
        vm.dataLength = res.data.data.length
        vm.housesTotal = res.data.total
        vm.start = vm.start + 1
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

}
