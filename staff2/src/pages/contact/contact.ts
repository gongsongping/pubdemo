import {NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';
import {Contactdetails} from '../contactdetails/contactdetails';
import axios from 'axios';


/*
 Generated class for the Contact page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class Contact {
  person = [];
  start = 0
  dataLength = 10
  allPerson: number
  myInput: any = ''
  shouldShowCancel: any
  showHeight = false
  mycity: any
  cities=[]
  contactdetails: any = Contactdetails

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let vm = this
    axios.get('/api/account/departments', {
      params: {
        type: 1
      }
    })
      .then(function (res) {
        vm.cities = res.data.data
        console.log(vm.cities);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  loadMore(infiniteScroll) {
    let vm = this
    let params = {
      params: {
        start: vm.start,
        enabled: true,
      }
    }
    axios.get('/api/account/employees', params)
      .then(function (res) {
        vm.person = vm.person.concat(res.data.data)
        vm.allPerson = res.data.total
        vm.dataLength = res.data.data.length
        vm.start = vm.start + 1
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onInput(event) {
    let vm = this
    let params = {
      params: {
        nameLike: vm.myInput,
        enabled: true,
        size: 999
      }
    }
    if (this.myInput) {
      axios.get('/api/account/employees', params).then(function (res) {
        //console.log(res.data.data);
        vm.dataLength = res.data.data
        vm.person = res.data.data
        vm.allPerson = res.data.data
      })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      vm.loadMore(false);
    }
  }

  onCancel(event) {
    console.log(event);
  }

  ionChange(){
    console.log(1);
  }
  openDepartment(){
    //  this.height = '500px'
    this.showHeight = true
  }
  closeDepartment(){
    //  this.height = '500px'
    this.showHeight = false
  }

  goDetail(t) {
    this.navCtrl.push(Contactdetails, {staff: t})
  }

  ionViewDidLoad() {
    this.loadMore(false)
  }

}
