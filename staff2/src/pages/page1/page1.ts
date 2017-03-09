import {Component} from '@angular/core';


import { NavController} from 'ionic-angular';

import { Home } from '../home/home';




@Component({selector: 'page-page1', templateUrl: 'page1.html'})
export class Page1 {
  home = Home
  constructor(public navCtrl : NavController) {}
  ionViewWillEnter() {
    console.log('----page1---- Page will enter',this.navCtrl.parent);
  }
  ngOnInit() {
    console.log('----page1---- Page oninit');
  }
}
