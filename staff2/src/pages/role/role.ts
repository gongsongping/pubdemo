import {Component} from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import axios from 'axios';
import { JwtHelper } from 'angular2-jwt';
import { Resetpw } from '../resetpw/resetpw';
import { Home } from '../home/home';
import { Message } from '../message/message';

/*
  Generated class for the Role page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({selector: 'page-role', templateUrl: 'role.html'})
export class Role {
  mobile : any;
  validateCode : any;
  loginErr : any;
  tokens:any; 
  userInfo:any;
  jwtHelper: JwtHelper = new JwtHelper();
  resetpw:any = Resetpw;
  message: any = Message;
  home: any = Home;
  tasksTotal:any;
  constructor(public navCtrl : NavController, public navParams : NavParams, public events: Events) {
   
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RolePage');
  }
  ionViewWillEnter() {
    if (localStorage.getItem('userInfo')){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.tokens = JSON.parse(localStorage.getItem('tokens'));
    } else {
        this.userInfo = ''
        this.tokens = ''
    }
  }

  ionViewDidEnter() {
    console.log('---- role Page will enter-----', this.navCtrl.parent);
    setTimeout(()=> {
      this.tasksTotal =  localStorage.getItem('tasksTotal');  
    }, 500);
    console.log('----role page taskstotal----',this.tasksTotal);
  }
  ngOnInit() {
    console.log('----- role Page oninit------');
  }

  //'/api/account/oauth/token' / '/api/account/employees/' + jwtHelper.decodeToken(res.data.access_token).user_id
  login() {
    let vm = this
    let url = '/api/account/oauth/token'
    let config = {
      headers: {
        'Authorization': 'Basic YnJvd3Nlcjo=',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    let data = `username=${vm.mobile.toUpperCase()}&password=${vm.validateCode}&scope=ui&grant_type=password`                
    axios
      .post(url, data, config)
      .then(function (res) {
        vm.loginErr = ''
        localStorage.setItem('tokens', JSON.stringify(res.data))
        vm.tokens = res.data
        axios.defaults.headers.common['Authorization'] = "Bearer " + res.data.access_token
        //get access_token
        axios
          .get('/api/account/employees/' + vm.jwtHelper.decodeToken(res.data.access_token).user_id)
          .then(function (res) {
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            vm.userInfo = res.data        
            vm.events.publish('user:created', 'user', 'time');
            vm.ionViewDidEnter()
            // vm.navCtrl.setRoot()
          })
          .catch(function (error) {
            alert('服务器错误');
            console.log(error);
          });

      })
      .catch(function (error) {
        alert('帐号或密码错误');
        console.log(error);
      });
  }

  getVericode() {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobile))) {
      this.loginErr = '手机号码有误'
      return
    }
    let url = '/api/account/validate_code'
    let config = {
      headers: {
        'Authorization': 'Basic YnJvd3Nlcjo=',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    let data = new FormData()
    data.append('mobile', this.mobile);
    data.append('type', 1);
    axios
      .post(url, data, config)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
        // this.loginErr = error.data.errorMessage
      });

  }
  
  pushHome(i,r){
    localStorage.setItem('role',r)
    this.navCtrl.push(i,{
        roleName:r
    });
    console.log(r)
  }
  goTo(p){
    this.navCtrl.setRoot(p)
  }
}
