import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contactdetails } from '../contactdetails/contactdetails';


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
  contactdetails:any = Contactdetails
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

}
