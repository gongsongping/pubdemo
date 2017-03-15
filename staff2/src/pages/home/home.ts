import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import { Housemine } from '../housemine/housemine';
import { Housesearch } from '../housesearch/housesearch';
import { Message } from '../message/message';
import { Recommendbuyer } from '../recommendbuyer/recommendbuyer';
import { Houseclue } from '../houseclue/houseclue';

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
  // tabOne = Page1;
  // tabTwo = Page2;
  // tabThree = Page3;
  // tabFour = Page4;
  tasksTotal:any
  messagesTotal:any
  houseclue:any = Houseclue
  constructor(public navCtrl: NavController, public navParams: NavParams) { 
     console.log(this.navParams.get('id'))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  ionViewDidEnter() {
    console.log('---- role Page will enter-----', this.navCtrl.parent);
    setTimeout(()=> {
      this.messagesTotal = localStorage.getItem('messagesTotal')
      this.tasksTotal =  localStorage.getItem('tasksTotal')  
    }, 1000);
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
