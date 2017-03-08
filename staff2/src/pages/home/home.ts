import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  // tabOne = Page1;
  // tabTwo = Page2;
  // tabThree = Page3;
  // tabFour = Page4;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
<<<<<<< HEAD
  tabIndex = 1;
  tabColor(index){
    let num = this;
    num.tabIndex = index;
  }

=======
  ngOnInit(){
    console.log('----home---- Page oninit');
  }
>>>>>>> 7f43978c00f3c17ce0409c89e5384252c61f013b
}
