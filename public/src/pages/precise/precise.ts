import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Precise page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-precise',
  templateUrl: 'precise.html'
})
export class Precise {

  constructor(public navCtrl: NavController) { }

  ionViewWillEnter() {
    console.log('Hello PrecisePage Page');
  }
  ngOnint(){
    console.log('Hello PrecisePage Page');
  }
  
  onFileChange(e){
    console.log(e.target.files[0])
  }

}
