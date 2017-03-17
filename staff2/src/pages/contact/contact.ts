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
  cities: any = []
  area: any = []
  branch: any = []
  group: any = []
  wsmasters: any = []
  mycity: any
  myarea: any
  mybranch: any
  mygroup: any
  mywsmasters: any
  userInfo: any
  contactdetails: any = Contactdetails

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  //封装下级部门
  departmentSelf(departmentId) {
    let vm = this
    axios.get('/api/account/departments', {
      params: {
        superiorId: departmentId
      }
    })
      .then(function (res) {
        vm.area = res.data.data
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
  }

  //打开删选功能
  openDepartment(){
    this.showHeight = true
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let vm = this
    let allDepartment = []
    let department = vm.userInfo.department
    axios.get('/api/account/departments', {
      params: {
        type: 1
      }
    })
      .then(function (res) {
        vm.cities = res.data.data
      })
      .catch(function (error) {
      });

    while(department){
      allDepartment.unshift(department)
      department = department.superior
    }
    if(allDepartment[0]){
      vm.mycity = allDepartment[0].id
      this.departmentSelf(vm.mycity)
    }
    if(allDepartment[1]){
      vm.myarea = allDepartment[1].id
      axios.get('/api/account/departments', {
        params: {
          superiorId: vm.myarea
        }
      })
        .then(function (res) {
          vm.branch = res.data.data
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if(allDepartment[2]){
      vm.mybranch = allDepartment[2].id
      axios.get('/api/account/departments', {
        params: {
          superiorId: vm.mybranch
        }
      })
        .then(function (res) {
          vm.group = res.data.data
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if(allDepartment[3]){
      vm.mygroup = allDepartment[3].id
      // this.departmentSelf(vm.mygroup.id)
      axios.get('/api/account/departments', {
        params: {
          superiorId: vm.mygroup
        }
      })
        .then(function (res) {
          vm.wsmasters = res.data.data
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // if(allDepartment[4]){
    //   vm.mywsmasters = allDepartment[4].id
    //   axios.get('/api/account/departments', {
    //     params: {
    //       superiorId: vm.mywsmasters
    //     }
    //   })
    //     .then(function (res) {
    //       vm.wsmasters = res.data.data
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }
  }

  cityChange(mycity){
    console.log(mycity);
  }

  areaChange(myarea){
    console.log(1);
    console.log(myarea);
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
