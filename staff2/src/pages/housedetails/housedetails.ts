import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { Districtdetails } from '../districtdetails/districtdetails';
import axios from 'axios';

/*
  Generated class for the Housedetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-housedetails',
    templateUrl: 'housedetails.html'
})
export class Housedetails {

    userInfo: any;
    house: any;
    isAction = false;
    houses = [];
    mySlideOptions;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // console.log(Params.get('house'))
        // this.house = Params.get('house')
        let vm = this;
        vm.house = navParams.get('house')
        let url = 'api/housing/houses/' + vm.house.id
        axios
            .get(url)
            .then(function (res) {
                vm.houses = res.data;
              console.log(vm.houses)
            })
            .catch(function (error) {
                alert('服务器错误');
                console.log(error);
            });
    }
    @ViewChild(Slides) slides: Slides;
    ngOnInit() {//页面加载完成后自己调用
        // this.mySlideOptions = {
        //     autoplay: 2000,
        //     initialSlide: 0,
        //     pager: true,
        //     loop: true,
        //     speed: 300,
        //     zoom: true,
        //     effect: 'flip'
        // };
        // setInterval(() => {
        //     this.slides.slideNext(500, true);
        //     // this.slides.slidePrev(500, true);
        // }, 2000);
    }
    // goToSlide() {
    //     this.slides.slideTo(2, 500);
    // }
    // startAutoplay() {
    //     this.slides.slideTo(2, 500);
    // }
    slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
        console.log("Current index is", currentIndex);
    }
    ionViewDidLoad() {
        // this.doInfinite(false);
        console.log('ionViewDidLoad HousesearchPage');
    }

    ionViewWillEnter() {
        // this.roleName = localStorage.getItem('role')
    }
    ionViewDidEnter() {
        let vm = this;
        if (localStorage.getItem('userInfo')) {
            vm.userInfo = JSON.parse(localStorage.getItem('userInfo'));
            console.log('-----', vm.userInfo);
            // vm.doInfinite(false);
            // vm.areaList();
        } else {
            vm.userInfo = ''
        }
    }
    districtDs(d) {
        this.navCtrl.push(Districtdetails, { house: d })
    }
    action() {
        this.isAction = !this.isAction
    }
}

