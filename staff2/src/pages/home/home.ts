import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Housemine } from '../housemine/housemine';
import { Housesearch } from '../housesearch/housesearch';
import { Message } from '../message/message';
import { Recommendbuyer } from '../recommendbuyer/recommendbuyer';
import { Houseclue } from '../houseclue/houseclue';
import { Ordermine } from '../ordermine/ordermine';
import { Customermine } from '../customermine/customermine';

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
  recommendbuyer: any = Recommendbuyer
  ordermine: any = Ordermine
  params
  // tabOne = Page1;
  // tabTwo = Page2;
  // tabThree = Page3;
  // tabFour = Page4;
  tasksTotal:any
  messagesTotal:any
  houseclue:any = Houseclue
  roleName:any
  tabIndex: any
  customermine: any = Customermine
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  ionViewWillEnter() {
    let vm = this;
    vm.roleName = localStorage.getItem('role')
  }
  ionViewDidEnter() {
    // console.log(this.navParams.get('id'))
    // console.log('---- role Page will enter-----', this.navCtrl.parent);
    setTimeout(() => {
      this.messagesTotal = localStorage.getItem('messagesTotal')
      this.tasksTotal = localStorage.getItem('tasksTotal')
    }, 500);
    console.log('----role page taskstotal----', this.tasksTotal, '---messagesTotal---', this.messagesTotal);
    if (this.roleName == '开发专员'){
      this.tabIndex = 1;
    } else if(this.roleName == '看房顾问' || this.roleName == '看房顾问总经理'){
      this.tabIndex = 3;
    } else {
      this.tabIndex = 2;
    }
  }
  tabColor(index) {
    let vm = this;
    vm.tabIndex = index;
  }

  pushTo(h) {
    this.navCtrl.push(h);
  }

  ngOnInit() {
    console.log('----home---- Page oninit');
  }

}
