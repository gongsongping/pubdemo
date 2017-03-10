import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Home } from '../pages/home/home';
import { ModalResetpw } from '../providers/services';
import { Changepw } from '../pages/changepw/changepw';
import { Resetpw } from '../pages/resetpw/resetpw';
import { About } from '../pages/about/about';
import { Role } from '../pages/role/role';
import axios from 'axios';
import { Contact } from '../pages/contact/contact';



@Component({
    templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = Role
  home:any = Home
  changepw:any = Changepw
  resetpw:any = Resetpw
  about:any = About
  role:any = Role
  contact:any = Contact
  
  tokens:any
  userInfo:any


  constructor(public platform: Platform, public modalCtrl: ModalController, public events: Events) {
        // this.initializeApp();
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            console.log('---ready---');
        });

    }

 
  //willenter not workign
  ionViewWillEnter() {
      console.log('-----app root------ will enter baseUrl', localStorage.getItem('baseUrl'));
  }
  ngOnInit(){
      console.log('----root app---- Page will init',this.nav.parent);
      localStorage.setItem('baseUrl', 'http://60.205.169.195:7060')
      axios.defaults.baseURL = 'http://60.205.169.195:7060';
      this.events.subscribe('user:created', (user, time) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        console.log('----events Welcome', user, 'at', time);
        // this.menuOpened()
        if (localStorage.getItem('tokens')) {
            this.tokens = JSON.parse(localStorage.getItem('tokens'))
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            console.log(this.tokens,'-----',this.userInfo)
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.tokens.access_token
         } else {
            this.tokens = ''
            this.userInfo = '' 
         }
      });
      this.events.publish('user:created', 'user', 'time');
  }
  logout() {
      localStorage.setItem('tokens', '')
      localStorage.setItem('userInfo', '')
      this.userInfo = ''
      this.userInfo = ''
      this.events.publish('user:created', 'user', 'time');      
      this.nav.setRoot(Role)
  }
  
  goTo(p){
    this.nav.setRoot(p);
  }
  pushTo (p){
    this.nav.push(p)
  }
  resetpwModal (){
    console.log('--menu click test--');
    let log = this.modalCtrl.create(ModalResetpw,{});
    log.present();
  }

}
