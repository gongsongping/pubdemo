import { Component, ViewChild } from '@angular/core';
import { Events, Tabs as myTabs } from  'ionic-angular';
import { Home } from '../home/home';
import { Buy } from '../buy/buy';
import { Sell } from '../sell/sell';
import { Mine } from '../mine/mine';

 

 
@Component({
    templateUrl: 'tabs.html'
})
export class Tabs {
    // this tells the tabs component which Pages // should be each tab's root Page
    home: any = Home;
    buy: any = Buy;
    sell: any = Sell;
    mine: any = Mine;
    messagesTotal:any = 0
    @ViewChild('myTabs') tabRef: myTabs;
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
