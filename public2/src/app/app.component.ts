import {Component} from '@angular/core';
import {Platform, Events} from 'ionic-angular';
// import {StatusBar, Splashscreen} from 'ionic-native';
import { SplashScreen }  from  "@ionic-native/splash-screen"
import { StatusBar }  from  "@ionic-native/status-bar"
import {Tabs} from '../pages/tabs/tabs';
import axios from 'axios';
import { JwtHelper } from 'angular2-jwt';


@Component({
  templateUrl: 'app.html'
  // template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = Tabs;
  jwtHelper: JwtHelper = new JwtHelper();
  tokens:any
  userInfo:any
  constructor(platform : Platform,  public events: Events, splashScreen: SplashScreen, statusBar :StatusBar) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available. Here you can do
      // any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  //not working
  ionViewWillEnter() {
    console.log('----root app----- Page will enter');
  }
  //not working
  ionViewDidLoad() {
    console.log('----root app----- Page did load');
  }
  
  ngOnInit(){
      //set global base url
      localStorage.setItem('baseUrl', '')
      // localStorage.setItem('baseURL', 'http://60.205.169.195:7060')
      axios.defaults.baseURL = 'http://60.205.169.195:7060';
      // axios.defaults.baseURL = 'http://cd.bihuhaofang.com';
      // axios.defaults.baseURL = 'http://bj.bihuhaofang.com';
      console.log('----root app---- Page will init base url', axios.defaults.baseURL);

      this.events.subscribe('tokens:refresh', (user, time) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        console.log('----events refresh', user, 'at', time);
        let vm = this
        if (localStorage.getItem('tokens')) {
            this.tokens = JSON.parse(localStorage.getItem('tokens'))
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            console.log('------',this.tokens,'-----',this.userInfo)
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.tokens.access_token

            let access_token = this.tokens.access_token
            let refresh_token = this.tokens.refresh_token
            console.log('---accesstoken expired----', this.jwtHelper.isTokenExpired(access_token), '---refreshtoken expired----', this.jwtHelper.isTokenExpired(refresh_token));
            if (this.jwtHelper.isTokenExpired(refresh_token)) {
                // vm.logout()
                localStorage.setItem('tokens', '')
                localStorage.setItem('userInfo', '')
                this.tokens = ''
                this.userInfo = ''
            } else {
                if (this.jwtHelper.isTokenExpired(access_token)) {
                    let url = '/api/account/oauth/token'
                    let config = {
                        headers: {
                            'Authorization': 'Basic YnJvd3Nlcjo=',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    };
                    //refresh_token: $window.localStorage.refresh_token, grant_type: 'refresh_token'  
                    let data = `refresh_token=${refresh_token}&grant_type=refresh_token`                
                    axios.post(url, data, config)
                        .then(function (res) {
                            localStorage.setItem('tokens', JSON.stringify(res.data))
                            axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.access_token
                            vm.prepareInfo () // red prepareinfo
                        })
                } else {
                    vm.prepareInfo () 
                }
            }
         } else {
            console.log('---not log in---');
            this.tokens = ''
            this.userInfo = '' 
         }
      });
      this.events.publish('tokens:refresh', 'user', 'time');
  }
  
  prepareInfo () {
        if (localStorage.getItem('tokens')) {
            // let tokens = JSON.parse(localStorage.getItem('tokens'))
            let userInfo = JSON.parse(localStorage.getItem('userInfo'))
            axios.get('/api/message/notices?size=0&isRead=false&userId=' + userInfo.id)
                .then(function(res) {
                    localStorage.setItem('messagesTotal',res.data.total)
                    console.log('----messagesTotal----',res.data.total);
                    // vm.messagesTotal = res.data.total
                })
        } else {
            localStorage.setItem('messagesTotal','')
            // vm.messagesTotal = 0
        }
       
    }
  
}
