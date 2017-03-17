import { Component, ViewChild } from '@angular/core';
import { NavController,Tabs } from 'ionic-angular';
import { Precise } from '../precise/precise';
import { Login } from '../login/login';

/*
  Generated class for the Buy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html'
})
export class Buy {
  @ViewChild('myTabs') tabRef: Tabs;
  // userInfo:any;
  precise = Precise
  activeAreaTab = false
  activeHouseTypeTab = false
  activePriceTab = false
  activeMoreTab = false

  search:any
  constructor(public navCtrl: NavController) {}
  
  ionViewDidLoad() {
    this.tabRef.select(1);
    console.log('Hello BuyPage Page');
  }
  ionViewWillEnter() {
    // this.userInfo = window.localStorage.getItem('userInfo')
    console.log('Hello BuyPage Page');
  }
 
  chooseAreaTab (){
    this.activeAreaTab =  !this.activeAreaTab
    this.activeHouseTypeTab = false
    this.activePriceTab = false
    this.activeMoreTab = false
  }
  chooseHouseTypeTab(){
    this.activeAreaTab = false
    this.activeHouseTypeTab = !this.activeHouseTypeTab
    this.activePriceTab = false
    this.activeMoreTab = false
  }
  choosePriceTab(){
    this.activeAreaTab = false
    this.activeHouseTypeTab = false
    this.activePriceTab = !this.activePriceTab
    this.activeMoreTab = false
  }
  chooseMoreTab(){
    this.activeAreaTab = false
    this.activeHouseTypeTab = false
    this.activePriceTab = false
    this.activeMoreTab = !this.activeMoreTab
  }
  goPrecise(){
    if (window.localStorage.getItem('tokens')){
       this.navCtrl.push(Precise)
    } else {
       this.navCtrl.push(Login)      
    }
  }
  searchInput (e){
    console.log('--model--',this.search);
    console.log('--event--',e);

  }

}
