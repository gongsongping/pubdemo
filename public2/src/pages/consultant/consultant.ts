import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams , Slides} from 'ionic-angular';

/*
  Generated class for the Consultant page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-consultant',
  templateUrl: 'consultant.html'
})
export class Consultant {
  @ViewChild(Slides) slds:Slides
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidEnter() {
    console.log('ionViewDidEnter ConsultantPage');
    // this.slds.slideTo(2)
    console.log('---',this.slds.getActiveIndex(),'---');
  }
  tabs = ['置业顾问','房管家']
  activeTab
  chooseTab (i){
    console.log('---',i,'---',this.slds.getActiveIndex());
    this.activeTab = i
    this.slds.slideTo(i)
    console.log('---',i,this.slds.getActiveIndex(),'---');
  }
  
  ionSlideDrag(e){
    console.log('ionSlideDrag',this.slds.getActiveIndex(),e.swipeDirection,e.pageX,e.pageY);
  }
  ionSlideWillChange(e){
    console.log('ionSlideWillChange',this.slds.getActiveIndex(),e.swipeDirection,e.pageX,e.pageY);
  }
  ionSlideDidChange(e){
    console.log('ionSlideDidChange',this.slds.getActiveIndex(),e.swipeDirection,e.pageX,e.pageY);
  }
  ionSlidePrevStart(){
    console.log('ionSlidePrevStart',this.slds.getActiveIndex());
  }
  ionSlidePrevEnd(){
    console.log('ionSlidePrevEnd',this.slds.getActiveIndex());
  }
  ionSlideNextStart(){
    console.log('ionSlideNextStart',this.slds.getActiveIndex());
  }
  ionSlideNextEnd(){
    console.log('ionSlideNextEnd',this.slds.getActiveIndex());
  }
}
