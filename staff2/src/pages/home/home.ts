import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Housemine } from '../housemine/housemine';
import { Housesearch } from '../housesearch/housesearch';
import { Message } from '../message/message';
import { Recommendbuyer } from '../recommendbuyer/recommendbuyer';
import { Houseclue } from '../houseclue/houseclue';
import { Ordermine } from '../ordermine/ordermine';
import { Customermine } from '../customermine/customermine';
import axios from 'axios';
import { Tododetails } from '../tododetails/tododetails';


/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  housemine: any = Housemine
  housesearch: any = Housesearch
  message: any = Message
  recommendbuyer: any = Recommendbuyer
  ordermine: any = Ordermine
  params
  // tabOne = Page1;
  // tabTwo = Page2;
  // tabThree = Page3;
  // tabFour = Page4;
  tasksTotal:any
  messagesTotal:any
  houseclue:any = Houseclue
  roleName:any
  tabIndex: any
  customermine: any = Customermine
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.roleName = this.navParams.get('roleName')
   
    console.log('---ionViewDidLoad HomePage----',this.roleName);
    // this.roleName = localStorage.getItem('role')
     if (this.roleName == '开发专员'){
        this.tabIndex = 1;
      } else if(this.roleName == '看房顾问' || this.roleName == '看房顾问总经理'){
        this.tabIndex = 3;
      } else {
        this.tabIndex = 2;
      }
  }
 
  ionViewDidEnter() {
    // console.log(this.navParams.get('id'))
    // console.log('---- role Page will enter-----', this.navCtrl.parent);
    setTimeout(() => {
      this.messagesTotal = localStorage.getItem('messagesTotal')
      this.tasksTotal = localStorage.getItem('tasksTotal')
    }, 500);
    console.log('----role page taskstotal----', this.tasksTotal, '---messagesTotal---', this.messagesTotal);
   
  }
  tabColor(index) {
    let vm = this;
    vm.tabIndex = index;
  }

  pushTo(h) {
    this.navCtrl.push(h);
  }

  ngOnInit() {
    console.log('----home---- Page oninit');
  }
  
  //todos
  tokens:any
  userInfo:any
  tasks:any
  dataLength:any
  spinner:any 
  ionViewWillEnter() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.tokens = JSON.parse(localStorage.getItem('tokens'));
      let vm  = this
      vm.tasks = []
      vm.dataLength = 20
      vm.spinner = true
      //api/activiti/runtime/tasks?assingee=43
      let bs64 = window.btoa(vm.userInfo.username + ':' + vm.tokens.access_token)
      axios({
          method: 'get',
          headers: { "Authorization": "Basic " + bs64 },
          url: '/api/activiti/runtime/tasks?size=500&sort=createTime&order=desc&assignee=' + vm.userInfo.id
      }).then(function successCallback(res) {
              // console.log(res.data.data);
             setTimeout(() => {
                  vm.spinner = false
                  vm.dataLength = res.data.data.length
              }, 1000)
             vm.tasks = res.data.data
          })
     
  }


    getTaskVar  (t) {
        let vm = this
        let bs64 = window.btoa(vm.userInfo.username + ':' + vm.tokens.access_token)
        //runtime/tasks/{taskId}/variables
        // runtime/process-instances/{processInstanceId}/variables
        // $http({
        //     method: 'get',
        //     headers: {"Authorization": "Basic " + bs64},
        //     url: $rootScope.baseUrl + '/api/activiti/runtime/tasks/' + t.id+'/variables'
        // })
        //     .then(function successCallback(res) {
        //         // t.variables = res.data
        //     }, function errorCallback(res) {
        //
        //     })
        axios({
            method: 'get',
            headers: { "Authorization": "Basic " + bs64 },
            url: '/api/activiti/runtime/process-instances/' + t.processInstanceId + '/variables'
        }).then(function successCallback(res) {
                t.variables = res.data
            }, function errorCallback() { })
    }
    goTodoDetails (t) {
        this.navCtrl.push(Tododetails,{todo: t})
    }
    
    totalTasks:any
    getTotalTasks (s) {
        let vm = this
        let bs64 = window.btoa(vm.userInfo.username + ':' + vm.tokens.access_token)
        axios({
            method: 'get',
            headers: { "Authorization": "Basic " + bs64 },
            url: '/api/activiti/runtime/tasks?sort=createTime&order=desc&size=' + s
        }).then(function successCallback(res) {
                vm.totalTasks = res.data.data
            })
    }
 
}
