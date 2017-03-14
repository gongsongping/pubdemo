import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import { Housemine } from '../housemine/housemine';
import { Housesearch } from '../housesearch/housesearch';
import { Message } from '../message/message';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  housemine: any = Housemine
  housesearch: any = Housesearch
  message: any = Message
  // tabOne = Page1;
  // tabTwo = Page2;
  // tabThree = Page3;
  // tabFour = Page4;
  tasksTotal:any
  messagesTotal:any
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  ionViewWillEnter() {
    console.log('---- role Page will enter-----', this.navCtrl.parent);
    this.tasksTotal =  localStorage.getItem('tasksTotal') 
    this.messagesTotal = localStorage.getItem('messagesTotal')
    console.log('----role page taskstotal----',this.tasksTotal,'---messagesTotal---',this.messagesTotal);
  }
  tabIndex = 1;
  tabColor(index) {
    let num = this;
    num.tabIndex = index;
  }

  pushHousemine(h) {
    this.navCtrl.push(h);
  }

  ngOnInit() {
    console.log('----home---- Page oninit');
  }

}
