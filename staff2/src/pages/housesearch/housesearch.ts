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
    dataLength = 10;
    housesTotal = '';
    choosedTab = 10;
    choosed = false;
    start = 0;
    searchData = { input: '' }
    subtabs = [{ id: 0, title: '价格', choosed: true }, { id: 1, title: '户型', choosed: true }, { id: 2, title: '钥匙', choosed: true }, { id: 3, title: '更多', choosed: true }]
    selectTab = 0;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.initializeItems();
    }

    ionViewDidLoad() {
        this.doInfinite(false);
        console.log('ionViewDidLoad HousesearchPage');
    }

    searchQuery: string = '';
    items: string[];



    initializeItems() {
        this.items = [
            'Amsterdam',
            'Bogota'
        ];
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
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

    }
    blur() {

    }
    searchDis() {

    }
    inputSearch() {

    }
}

