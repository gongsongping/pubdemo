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
    messagesTotal = 0
    constructor(public events:Events) { }
    //not working
    ionViewWillEnter() {
        console.log('-----tabs------ will enter baseUrl', localStorage.getItem('baseUrl'));
    }
    ngOnInit(){
        console.log('------tabs----- Page oninit');
        this.events.subscribe('messages:update',()=>{
            let vm = this
            if (localStorage.getItem('tokens')) {
                let tokens = JSON.parse(localStorage.getItem('tokens'))
                let userInfo = JSON.parse(localStorage.getItem('userInfo'))
                axios.get('/api/message/notices?size=0&isRead=false&userId=' + userInfo.id)
                    .then(function(res) {
                        localStorage.setItem('messagesTotal',res.data.total)
                        console.log('----messagesTotal----',res.data.total);
                        vm.messagesTotal = res.data.total
                    })
            } else {
                localStorage.setItem('messagesTotal','')
                vm.messagesTotal = 0
            }
        })
        this.events.publish('messages:update')
    }
    chat(){
        console.log('--ionselect cahge--');
    }
    prepareInfo () {

    }
}
