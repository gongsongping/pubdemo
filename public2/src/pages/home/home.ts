import { Component } from '@angular/core';

import { NavController, Events } from 'ionic-angular';
import axios from 'axios';
import { Housedetails } from '../housedetails/housedetails';
import { Precise } from '../precise/precise';
import { Login } from '../login/login';

import { TestService } from '../../providers/services';

declare var BMap: any;
// declare var BMAP_ANIMATION_BOUNCE: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {
    houses = [];
    start = 0;
    dataLength = 10;
    housesTotal: any;
    textTitle = 0;
    renting = [
       {
          textTitle:0, 
          title:'买房/卖房'
       },
       {
          textTitle:1, 
          title:'租房/出租'
       }
    ] 
    constructor(public navCtrl: NavController, private testService: TestService, public events: Events) { }
    loadMore(infiniteScroll) {
        let vm = this;
        let params = {
            params: {
                start: vm.start
            }
        }
        axios.get('/api/housing/houses?size=10&status=2', params)
            .then(function (res) {
                vm.houses = vm.houses.concat(res.data.data);
                vm.dataLength = res.data.data.length
                // vm.housesTotal = res.data.total
                vm.start = vm.start + 1
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            })
    }
    ionViewWillEnter() {
        //refresh token
        // this.events.publish('tokens:refresh', 'user', 'time');// red refresh token
        this.events.publish('messages:update')
    }
    doRefresh(refresher) {
        this.houses = [];
        this.start = 0;
        this.dataLength = 10;
        this.loadMore(refresher)
    }
    ionViewDidLoad() {
        setTimeout(()=>{
          this.loadMore(false)
        },1000)
    }
    goDetail(h) {
        this.navCtrl.push(Housedetails, { house: h })
    }
    goPrecise() {
        if (window.localStorage.getItem('tokens')) {
            this.navCtrl.push(Precise)
        } else {
            this.navCtrl.push(Login)
        }
    }
    // 选项卡
    rentingClick(index){
        this.textTitle = index.textTitle;
    }

    goBuy(){
      this.navCtrl.parent.select(1);
    }
}
