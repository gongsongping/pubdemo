import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Home } from '../pages/home/home';

import { Changepw } from '../pages/changepw/changepw';
import { Resetpw } from '../pages/resetpw/resetpw';
import { About } from '../pages/about/about';
import { Role } from '../pages/role/role';
import axios from 'axios';
import { Contact } from '../pages/contact/contact';
import { JwtHelper } from 'angular2-jwt';



@Component({
    templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = Role
  home:any = Home
  changepw:any = Changepw
  resetpw:any = Resetpw
  about:any = About
  role:any = Role
  contact:any = Contact
  
  tokens:any
  userInfo:any
  jwtHelper: JwtHelper = new JwtHelper();
  roleName:any
  constructor(public platform: Platform, public modalCtrl: ModalController, public events: Events) {
        // this.initializeApp();
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            console.log('---ready---');
        });

    }


  //willenter not workign
  ionViewWillEnter() {
     this.roleName =  localStorage.getItem('role')
      console.log('-----app root------ will enter baseUrl', localStorage.getItem('baseUrl'));
  }
  ngOnInit(){
      console.log('----root app---- Page will init',this.nav.parent);
      localStorage.setItem('baseUrl', 'http://60.205.169.195:7060')
      axios.defaults.baseURL = 'http://60.205.169.195:7060';
      
      this.events.subscribe('user:created', (user, time) => {
        console.log('----events userinfo', user, 'at', time);
        if (localStorage.getItem('tokens')) {
            this.tokens = JSON.parse(localStorage.getItem('tokens'))
            this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
            console.log(this.tokens,'-----',this.userInfo)
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.tokens.access_token
            this.refreshToken() //red refresh token
         } else {
            this.tokens = ''
            this.userInfo = '' 
         }
      });
      this.events.publish('user:created', 'user', 'time');
  }
  logout() {
      localStorage.setItem('tokens', '')
      localStorage.setItem('userInfo', '')
      localStorage.setItem('messagesTotal','')      
      localStorage.setItem('tasksTotal','')                  
      this.userInfo = ''
      this.userInfo = ''
      delete axios.defaults.headers.common["Authorization"]
      this.events.publish('user:created', 'user', 'time');      
      this.nav.setRoot(Role)
  }

  refreshToken (){
    if (localStorage.getItem('tokens')) {
        let vm = this;
        // this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let access_token = JSON.parse(localStorage.getItem('tokens')).access_token
        let refresh_token = JSON.parse(localStorage.getItem('tokens')).refresh_token
        console.log('---accesstoken expired----', this.jwtHelper.isTokenExpired(access_token), '---refreshtoken expired----', this.jwtHelper.isTokenExpired(refresh_token));
        if (this.jwtHelper.isTokenExpired(refresh_token)) {
            vm.logout()
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
                        vm.prepareInfo() //red prepareInfo                        
                    })
                    
            } else {
                vm.prepareInfo() //red prepareInfo
            }
        }
    }
    
  }

  prepareInfo () {
      let tokens = JSON.parse(localStorage.getItem('tokens'))
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      axios.get('/api/message/notices?size=0&isRead=false&userId=' + userInfo.id)
          .then(function(res) {
              localStorage.setItem('messagesTotal',res.data.total)
              console.log('----messagesTotal----',res.data.total);
              // this.messagesTotal = res.data.total
          })

      // let bs64 = window.btoa(userInfo.username + ':' + tokens.access_token)
      // axios({
      //   method:'get',
      //   url:'/api/activiti/runtime/tasks?size=500&sort=createTime&order=desc&assignee=' + userInfo.id,
      //   headers:{
      //     "Authorization": "Basic " + bs64
      //   }
      // }).then(function(res) {
      //       localStorage.setItem('tasksTotal',res.data.total) 
      //       console.log('----tasksTotal----',res.data.total);                       
      //       // this.tasksTotal = res.data.total
      //     })
  }
  
  goTo(p){
    this.nav.setRoot(p);
  }
  pushTo (p){
    this.nav.push(p)
  }
  

}
