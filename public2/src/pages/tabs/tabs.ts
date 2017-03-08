import { Component } from '@angular/core';

import { Home } from '../home/home';
import { Buy } from '../buy/buy';
import { Sell } from '../sell/sell';
import { Mine } from '../mine/mine';
import axios from 'axios';

 

 
@Component({
    // templateUrl: 'tabs.html'
    template: `
    <ion-tabs>
      <ion-tab [root]="home" tabTitle="首页" tabIcon="homebhhf"></ion-tab>
      <ion-tab [root]="buy" tabTitle="买房" tabIcon="buybhhf"></ion-tab>
      <ion-tab [root]="sell" tabTitle="卖房" tabIcon="sellbhhf"></ion-tab>
      <ion-tab [root]="mine" tabTitle="我的" tabIcon="minebhhf"></ion-tab>
    </ion-tabs>
`
})
export class Tabs {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    home: any = Home;
    buy: any = Buy;
    sell: any = Sell;
    mine: any = Mine;

    constructor() { }
    ionViewWillEnter() {
        localStorage.setItem('baseUrl', 'http://60.205.169.195:7060')
        axios.defaults.baseURL = 'http://60.205.169.195:7060';
        if (localStorage.getItem('tokens')) {
            let tokens = JSON.parse(localStorage.getItem('tokens'))
            console.log(tokens)
            axios.defaults.headers.common['Authorization'] = "Bearer " + tokens.access_token
        }
        console.log('-----tabs------ will enter baseUrl', localStorage.getItem('baseUrl'));
    }
    ngOnInit(){
        console.log('------tabs----- Page oninit');
    }
}
