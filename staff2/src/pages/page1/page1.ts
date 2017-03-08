import {Component} from '@angular/core';

<<<<<<< HEAD
import { NavController} from 'ionic-angular';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  
  constructor(public navCtrl: NavController) {
    
  }
  
=======
import {NavController} from 'ionic-angular';
// import {ViewController} from 'ionic-angular';
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
>>>>>>> 7f43978c00f3c17ce0409c89e5384252c61f013b
}
