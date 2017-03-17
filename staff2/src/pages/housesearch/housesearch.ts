import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';

/*
  Generated class for the Housesearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-housesearch',
    templateUrl: 'housesearch.html'
})
export class Housesearch {
    houses = []
    housesTotal = 1;
    choosedTab = 10;
    choosed = false;
    inputStart = false;
    start = 0;
    dataLength = 10;
    searchData = { input: '' }
    subtabs = [{ id: 0, title: '价格', choosed: true }, { id: 1, title: '户型', choosed: true }, { id: 2, title: '钥匙', choosed: true }, { id: 3, title: '更多', choosed: true }]
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        
    }

    ionViewDidLoad() {
        this.doInfinite(false);
        console.log('ionViewDidLoad HousesearchPage');
    }

    doInfinite(infiniteScroll) {
        let vm = this
        let url = '/api/housing/houses';
        let params = {
            params: {
                start: vm.start
            }
        }
        axios
            .get(url,params)
            .then(function (res) {
                setTimeout(() => {
                        vm.houses = vm.houses.concat(res.data.data);
                        vm.dataLength = res.data.data.length;
                        vm.housesTotal = res.data.total;
                        vm.start = vm.start + 1;
                        if (infiniteScroll) {
                            infiniteScroll.complete();
                        }
                }, 500);
            })
            .catch(function (error) {
                alert('服务器错误');
                console.log(error);
            });
    }
    chooseTab(t) {
        // console.log(t.choosed)
        let vm = this;
            vm.choosedTab = t.id;
            // vm.choosedTab = 10;
        // if (vm.choosed = t.choosed) {
        //     vm.choosedTab = t.id;
        // } else {
        //     vm.choosed = false;
        //     vm.choosedTab = 10;
        // }
    }
    focus() {
       this.inputStart = true;
    }
    blur() {
       this.inputStart = false;
    }
    searchDis() {

    }
    inputSearch() {

    }
}

