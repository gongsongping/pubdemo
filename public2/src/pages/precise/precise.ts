import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import axios from 'axios';
/*
  Generated class for the Precise page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-precise',
  templateUrl: 'precise.html'
})
export class Precise {

  constructor(public navCtrl: NavController) { }
  tokens = JSON.parse(localStorage.getItem('tokens'))
  userInfo = JSON.parse(localStorage.getItem('userInfo'))  
  districts:any
  buy_recommend_id:any
  ionViewWillEnter() {
    let vm = this
    console.log('Hello PrecisePage Page');
    // '/api/activiti/repository/process-definitions?latest=true&key=buy_recommend'
      
    var bs64 = window.btoa(vm.userInfo.username + ':' + vm.tokens.access_token)
    axios({
        method: 'get',
        headers: { "Authorization": "Basic " + bs64 },
        url: '/api/activiti/repository/process-definitions?latest=true&key=buy_recommend'
    }).then(function successCallback(res) {
            vm.buy_recommend_id = res.data.data[0].id
            // console.log(vm.buy_recommend_id );
        })
    axios({
        method: 'get',
        url: '/api/housing/subdistricts?size=20'//[?query]regions
    }).then(function successCallback(res) {
            vm.districts = res.data.data
        })
  }
  ngOnint(){
    console.log('Hello PrecisePage Page');
  }
  districtShow = false
  districtToggle(){
    this.districtShow = !this.districtShow
  }


  searchData = { input: '' }
  clearInput (e) {
      this.searchData.input = ""
      // console.log('---inputparams--',this.inputParams);
  }

  searchDisOnInpuChange (e) {
      console.log(this.searchData.input);
      let vm = this
      axios({
          method: 'get',
          url:  '/api/housing/subdistricts',
          params: { size: 10, nameLike: e.target.value }
      }).then(function (res) {
              vm.districts = res.data.data
          })
  }

  choosedDis:any
  chooseDis(d) {
      this.searchData.input = ''
      this.choosedDis = d
      console.log('choose searchdata',this.searchData.input);
      this.districtShow = !this.districtShow
  }


    //精准购房
    house = {user_name:'',mobile:''}
    startBuyRecommend () {
        // api/activiti/runtime/process-instances
        let vm = this
        if (!vm.choosedDis) {
            alert('小区不能为空')
            return
        }
        if (vm.house.user_name) {
            // /api/account/users 
            let data = `name=${vm.house.user_name}`
            axios({
                method: 'put',
                url: '/api/account/users/' + vm.userInfo.id,
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(res) {
                    // vm.name = res.data.name
                })
        }
        let bs64 = window.btoa(vm.userInfo.username + ':' + vm.tokens.access_token)
        // console.log($scope.house, bs64);
        axios({
            method: 'post',
            url: '/api/activiti/runtime/process-instances',
            headers: { "Authorization": "Basic " + bs64 },
            data: {
                "processDefinitionId": vm.buy_recommend_id,
                "variables": [{
                    "name": "creator_id",
                    "type": "long",
                    "value": vm.userInfo.id
                }, {
                    "name": "region_id",
                    "value": vm.choosedDis.regionId//$scope.choosedRegion.id
                }, {
                    "name": "customer_name",
                    "value": vm.house.user_name //$window.localStorage.user_id
                }, {
                    "name": "customer_mobile",
                    "value": vm.userInfo.mobile
                }]
            }
        }).then(function successCallback() {
                // $scope.$emit('alert', { t: '成功', b: '提交成功' })
                alert('提交成功')
                vm.navCtrl.pop()
            }).catch(function errorCallback() {
                // $scope.$emit('alert', { t: '错误', b: '服务器错误' })
                alert('服务器错误')                
            })
    }

  
  onFileChange(e){
    console.log(e.target.files[0])
  }

}
