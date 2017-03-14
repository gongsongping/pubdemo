import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';

/*
  Generated class for the Todo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class Message {
  totalFalse = '';
  totalTrue = '';
  messageHead = [];
  messages = [];
  selectTab = false;
  userInfo: any;
  messagesId = [];
  isActive = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
        
  }

  ngOnInit() {
  }
  ionViewWillLoad() {
    console.log('ionViewDidLoad Message');
  }
  ionViewWillEnter() {
    console.log('ionViewDidLoad Message');
    let vm = this;
    vm.selectTab = false;
    if (localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log('-----', this.userInfo);
      this.totalMessages();
      this.messageFalse();
    } else {
      this.userInfo = ''
    }
  }
  totalMessages() {
    console.log(this.userInfo);
    let vm = this
    let url = '/api/message/notices?userId=' + this.userInfo.id
    axios
      .get(url + '&isRead=false')
      .then(function (res) {
        vm.totalFalse = res.data.total;
        axios
          .get(url + '&isRead=true')
          .then(function (res) {
            vm.totalTrue = res.data.total;
            console.log(vm.totalTrue)
            vm.messageHead = [{ name: '未读消息', read: false, status: vm.totalFalse }, { name: '历史消息', read: true, status: vm.totalTrue }]
          })
          .catch(function (error) {
            alert('服务器错误');
            console.log(error);
          });
      })
      .catch(function (error) {
        alert('服务器错误');
        console.log(error);
      });
  }
  selectStatus(m) {
    let vm = this;
    vm.selectTab = m;
    vm.messages = [];
    vm.messageFalse();
  }
  messageFalse() {
    let vm = this;
    let url = '/api/message/notices?userId=' + this.userInfo.id
    axios
      .get(url + '&isRead=' + vm.selectTab)
      .then(function (res) {
        console.log(res.data.data)
        vm.messages = vm.messages.concat(res.data.data);
      })
      .catch(function (error) {
        alert('服务器错误');
        console.log(error);
      });
  }
  messagesClickEnter(m) {
    let vm = this
    vm.messagesId.push[m.id];
    vm.isActive = m.id;
    let url = '/api/message/notices';
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' 
      }
    };
    
    let data = new FormData()
    data.append('noticesIds', JSON.stringify(vm.messagesId));
    data.append('isRead', 'true');
    axios
      .put(url, data, config)
      .then(function (res) {
        m.isRead = true;
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
        // this.loginErr = error.data.errorMessage
      });
  }
}
