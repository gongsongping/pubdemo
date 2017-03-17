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
                vm.housesTotal = res.data.total
                vm.start = vm.start + 1
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            })
    }
    ionViewWillEnter() {
        //refresh token
        this.events.publish('tokens:refresh', 'user', 'time');// red refresh token
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);               // 将标注添加到地图中
        // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    }
    doRefresh(refresher) {
        this.houses = [];
        this.start = 0;
        this.dataLength = 10;
        this.loadMore(refresher)
    }
    ionViewDidLoad() {
        this.loadMore(false)
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
}
