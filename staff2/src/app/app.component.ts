import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Home } from '../pages/home/home';
import { LoginModal } from '../providers/services';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = Home;

  pages: Array<{title: string, component: any}>;
  home:any = Home
  constructor(public platform: Platform, public modalCtrl: ModalController) {
    // this.initializeApp();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      console.log('---ready---');
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 }
    ];

  } 
  menuOpened (){
    console.log('----menuopend----');
  }
  // initializeApp() {}
  goHome(p){
    // this.nav.setRoot(p);
    this.nav.push(p)
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  ionViewWillEnter() {
     console.log('----root app---- Page will enter',this.nav.parent);
  }
  ngOnInit(){
     console.log('----root app---- Page oninit');
    //  this.loginModal()
  }
  loginModal (){
    console.log('--menu click test--');
    let log = this.modalCtrl.create(LoginModal);
    log.present();
    // window.location.reload()
  }
}
