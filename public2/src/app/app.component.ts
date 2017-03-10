import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {Tabs} from '../pages/tabs/tabs';
import axios from 'axios';


@Component({
  templateUrl: 'app.html'
  // template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = Tabs;
  constructor(platform : Platform) {
    platform
      .ready()
      .then(() => {
        // Okay, so the platform is ready and our plugins are available. Here you can do
        // any higher level native things you might need.
        StatusBar.styleDefault();
        Splashscreen.hide();
      });
  }
  //not working
  ionViewWillEnter() {
    console.log('----root app----- Page will enter');
  }
  ngOnInit() {
    console.log('----root app----- Page oninit');
    localStorage.setItem('baseUrl', 'http://60.205.169.195:7060')
    axios.defaults.baseURL = 'http://60.205.169.195:7060';
    if (localStorage.getItem('tokens')) {
      let tokens = JSON.parse(localStorage.getItem('tokens'))
      console.log(tokens)
      axios.defaults.headers.common['Authorization'] = "Bearer " + tokens.access_token
    }
  }
}
