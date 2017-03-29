import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import axios from 'axios';
/*
  Generated class for the Visitrecord page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-visitrecord',
    templateUrl: 'visitrecord.html'
})
export class Visitrecord {
    selectTab = 1;
    userInfo:any;
    total:any;
    record:any;
    visit = 1;
    statusParams='&statusIn=[-2,-1,0,1,3,4,5,8,9]';
    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    records = [{ name: '全部', status: '[-2,-1,0,1,3,4,5,8,9]',id:1 }, { name: '看房中', status: 3 ,id:2}, { name: '待付款', status: 1 ,id:3}, { name: '过户中', status: '[5,8,9]' ,id:4}, { name: '已完成', status: 0 ,id:5}]

    ionViewDidLoad() {
        console.log('ionViewDidLoad SellrecordPage');
        if (localStorage.getItem('userInfo')) {
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log('-----', this.userInfo);
        } else {
            this.userInfo = ''
        }
    }
    ionViewWillEnter() {
        this.initial();
    }
    initial(){
        let vm = this;
        let url = '/api/mission/missions?typeIn=[1,2]&demanderId=' + vm.userInfo.id + vm.statusParams;
        axios.get(url)
            .then(function (res) {
                console.log(res)
                vm.total = res.data.total
                vm.record = res.data.data;
            })
    }
    selectStatus(m){
        let vm = this;
        vm.selectTab = m.id;
        vm.statusParams = '&statusIn=' + m.status;
        vm.initial();
    }
    statisticsNone(){
        this.visit = 2;
    }
}
