import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Home } from '../pages/home/home';
import { ModalResetpw } from '../providers/services';
import { Changepw } from '../pages/changepw/changepw';
import { Resetpw } from '../pages/resetpw/resetpw';
import { About } from '../pages/about/about';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = Home;
  home:any = Home
  changepw:any = Changepw
  resetpw:any = Resetpw
  about:any = About

  constructor(public platform: Platform, public modalCtrl: ModalController) {
    // this.initializeApp();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      console.log('---ready---');
    });

  } 
  menuOpened (){
    console.log('----menuopend----');
  }
  // initializeApp() {}
  goTo(p){
    this.nav.setRoot(p);
    // this.nav.push(p)
  }
  ionViewWillEnter() {
     console.log('----root app---- Page will enter',this.nav.parent);
  }
  ngOnInit(){
     console.log('----root app---- Page oninit');
  }
  resetpwModal (){
    console.log('--menu click test--');
    let log = this.modalCtrl.create(ModalResetpw,{});
    log.present();
  }
}
