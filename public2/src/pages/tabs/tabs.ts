import { Component } from '@angular/core';
import { Events } from  'ionic-angular';
import { Home } from '../home/home';
import { Buy } from '../buy/buy';
import { Sell } from '../sell/sell';
import { Mine } from '../mine/mine';
import axios from 'axios';
 

 
@Component({
    templateUrl: 'tabs.html'
//     template: `
//     <ion-tabs>
//       <ion-tab [root]="home" tabTitle="首页" tabIcon="homebhhf"></ion-tab>
//       <ion-tab [root]="buy" tabTitle="买房" tabIcon="buybhhf"></ion-tab>
//       <ion-tab [root]="sell" tabTitle="卖房" tabIcon="sellbhhf"></ion-tab>
//       <ion-tab [root]="mine" tabTitle="我的" tabIcon="minebhhf"></ion-tab>
//     </ion-tabs>
// `
})
export class Tabs {
    // this tells the tabs component which Pages // should be each tab's root Page
    home: any = Home;
    buy: any = Buy;
    sell: any = Sell;
    mine: any = Mine;
    messagesTotal:any = 0
    constructor(public events:Events) { }
    //not working
    ionViewWillEnter() {
        console.log('-----tabs------ will enter baseUrl', localStorage.getItem('baseUrl'));
    }
    ngOnInit(){
        console.log('------tabs----- Page oninit');
        this.events.subscribe('messages:update',()=>{
            let vm = this
            this.events.publish('tokens:refresh', 'user', 'time');
            if (localStorage.getItem('tokens')) {
                setTimeout(()=>{
                  vm.messagesTotal = localStorage.getItem('messagesTotal')
                  console.log('----tabs-messagesTotal----',vm.messagesTotal);
                },500)
            } else {
                vm.messagesTotal = 0
            }
        })
        this.events.publish('messages:update')
    }
    chat(){
        console.log('--ionselect cahge--');
    }
    
}
