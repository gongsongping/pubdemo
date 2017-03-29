import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios'
import entries from "lodash/entries";
import assign from "lodash/assign";

/*
  Generated class for the Tododetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tododetails',
  templateUrl: 'tododetails.html'
})
export class Tododetails {
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  
  getDetails (des,url){
    axios({
          method: 'get',
          url: url + des.value
      }).then(function successCallback(res) {
              des.details = res.data
          })
          // .catch(function () {
          //     des.details = null
          // })
  }

  todo: any;
  variables:any;
  descriptionMap = [];
  formData:any;
  formProperties:any;

  ionViewWillEnter() {
    let vm = this
    vm.todo = vm.navParams.get('todo')
    vm.variables = vm.navParams.get('variables')
    vm.descriptionMap = vm.navParams.get('descriptionMap')
    console.log(vm.descriptionMap);    

    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let tokens = JSON.parse(localStorage.getItem('tokens'));
    let bs64 = window.btoa(userInfo.username + ':' + tokens.access_token)

    axios({
        method: 'get',
        headers: { "Authorization": "Basic " + bs64 },
        url: '/api/activiti/form/form-data?taskId=' + vm.todo.id
    }).then(function successCallback(res) {
            vm.formData = res.data
            vm.formProperties = res.data.formProperties
            console.log(vm.formData, vm.formProperties);
        })

    if (vm.descriptionMap.length) {
        return
    }
    axios({
        method: 'get',
        headers: { "Authorization": "Basic " + bs64 },
        url: '/api/activiti/runtime/process-instances/' + vm.todo.processInstanceId + '/variables'
    }).then(function successCallback(res) {
            vm.variables = res.data

            if (!vm.todo.description){ return}
            // from [{'buy_id','买家'}] to [{name:'buy_id',nameCn:'买家'}]
            let description = JSON.parse(vm.todo.description).map(function (d) {
                let da =  entries(d)[0]
                return {name:da[0],nameCn:da[1]}                
            })
            // from [{name:'buy_id',nameCn:'买家'}] to [{name:'buy_id',nameCn:'买家',value:12}]
            description.forEach(function (d) {
                 vm.variables.forEach(function (v) {
                    if (d.name == v.name){
                      vm.descriptionMap.push(assign(d,v))
                    }
                 })
            })
            // seller_id? {"mission_id":"订单"},{"buyer_id":"买家"},{"house_id": "房源"},{"region_id":"区域"},
            // // // // '/api/account/employees/''/api/account/users/''/api/mission/missions/''/api/housing/houses/''/api/housing/regions/'
            vm.descriptionMap.forEach(function (d) {
                if (d.name == 'mission_id'){
                   vm.getDetails(d,'/api/mission/missions/')
                }
                if (d.name == 'buyer_id'){
                   vm.getDetails(d,'/api/account/users/')
                }
                if (d.name == 'seller_id'){
                   vm.getDetails(d,'/api/account/users/')
                }
                if (d.name == 'house_id'){
                   vm.getDetails(d,'/api/housing/houses/')
                }
                if (d.name == 'region_id'){
                   vm.getDetails(d,'/api/housing/regions/')
                }
            })
            setTimeout(()=>{
              console.log(vm.descriptionMap);
            },2000)
        })
        
    
    // getMoreInfo (d, url) {
    //     // url: $rootScope.baseUrl + '/api/activiti/runtime/process-instances/' + $scope.todo.processInstanceId+'/variables/'+d[0]
    //   this.variables.forEach(function (v) {
    //         // if (v.name=="region_id"){
    //         //     $scope.region_id = v.value
    //         //     console.log($scope.region_id);
    //         // }
    //         if (v.name == d[0]) {
    //             d[2] = v
    //             if (!url) { return }
    //             axios({
    //                 method: 'get',
    //                 url: url + d[2].value
    //             }).then(function successCallback(res) {
    //                     d[2].details = res.data
    //                 }, function errorCallback() {
    //                     d[2].details = null
    //                 })
    //         }
    //     })
    // }

  }


}
