import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios'
import entries from "lodash/entries";
import assign from "lodash/assign";
// import { Districtdetails } from '../districtdetails/districtdetails';
import { Housedetails } from '../housedetails/housedetails';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

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
  }
  
  housedetails = Housedetails
  goHousedetails(param){
    this.navCtrl.push(Housedetails, {house: param})
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

    if (vm.descriptionMap.length) { return }

    axios({
        method: 'get',
        headers: { "Authorization": "Basic " + bs64 },
        url: '/api/activiti/runtime/process-instances/' + vm.todo.processInstanceId + '/variables'
    }).then(function successCallback(res) {
            vm.variables = res.data

            if (!vm.todo.description){ return }
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

  }

  ionViewDidEnter() {

  }  
  
    // var bs64 = window.btoa($rootScope.user_name + ':' + $window.localStorage.access_token)
    submitTask (v) {
        let vm = this
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        let tokens = JSON.parse(localStorage.getItem('tokens'));
        let bs64 = window.btoa(userInfo.username + ':' + tokens.access_token)

        axios({
            method: 'post',
            headers: { "Authorization": "Basic " + bs64 },
            data: {
                action: 'complete',
                variables: v
            },
            url:  '/api/activiti/runtime/tasks/' + vm.todo.id
        }).then(function successCallback() {
                // vm.$emit('alert', { t: '成功', b: '提交成功' })
                // $ionicHistory.goBack()
                alert('提交成功')
                vm.navCtrl.pop()
            }).catch(function errorCallback() {
                // vm.$emit('alert', { t: '错误', b: '服务器错误' })
                alert('服务器错误')                
            })
    }
    //日期选择

    house  // = {room:'',hall:'',kitchen:'',bathroom:''} //room: 0, hall: 0, kitchen: 0, bathroom: 0
    endTask () {
        let vm = this
        let variables = []
        let ok = true
        let floor, total_floor;
        vm.formProperties.forEach(function (p) {
            let variable:any
            variable.name = p.id
            if (p.type == 'date') {
                // console.log(vm.house.pickedTime);
                // variable.value = vm.house.pickedTime
            } else if (p.id == 'contract_images') {  //id contract_images//name 合同图片
                variable.value = JSON.stringify(vm.designUrls)
            } else if (p.id == 'receipt_images') {  //receipt_images//收据图片
                variable.value = JSON.stringify(vm.innerUrls)
            } else if (p.id == 'planImages') {   //planImages//户型图
                variable.value = JSON.stringify(vm.designUrls)
            } else if (p.id == 'images') {  //images//房屋照片
                variable.value = JSON.stringify(vm.innerUrls)
            } else if (p.id == 'house_type') {
                if (!vm.house.room) {
                    vm.house.room = 0
                }
                if (!vm.house.hall) {
                    vm.house.hall = 0
                }
                if (!vm.house.kitchen) {
                    vm.house.kitchen = 0
                }
                if (!vm.house.bathroom) {
                    vm.house.bathroom = 0
                }
                variable.value = vm.house.room + '-' + vm.house.hall + '-' + vm.house.kitchen + '-' + vm.house.bathroom
            } else if (p.id == "house_detail_addr") {
                if ((vm.house.building != undefined) && (vm.house.unit != undefined) && (vm.house.room1 != undefined)) {
                    variable.value = vm.house.building + '-' + vm.house.unit + '-' + vm.house.room1
                } else {
                    if (ok) {
                        // vm.$emit('alert', { t: '错误', b: '物业地址楼栋、单元、门牌号不能为空' })
                        alert('物业地址楼栋、单元、门牌号不能为空')
                    }
                    ok = false
                }
            } else if (p.id == 'region_id') {
                // // if (vm.choosedHouse){
                // if (vm.choosedRegion) {
                //     variable.value = vm.choosedRegion.regionId
                // } else {
                //     variable.value = Number(p.value)
                // }
            } else if (p.id == 'house_id') {
                // if (vm.choosedHouse) {
                //     variable.value = vm.choosedHouse.id
                // } else {
                //     variable.value = null
                // }
            } else {
                variable.value = p.value
            }
            //enum 转换
            if (p.type == 'enum') {
                variable.type = 'string'
            } else {
                variable.type = p.type
            }
            //判断手机号码是否有效seller_mobile/buyer_mobile
            if (variable.name == 'buyer_mobile') {
                var ts = /^1(3|4|5|7|8)\d{9}$/.test(variable.value)
                if (!ts) {
                    if (ok) {
                        // vm.$emit('alert', { t: '错误', b: '买家手机号码无效' })
                        alert('买家手机号码无效')
                    }
                    ok = false
                }
            }
            if (variable.name == 'seller_mobile') {
                var ts = /^1(3|4|5|7|8)\d{9}$/.test(variable.value)
                if (!ts) {
                    if (ok) {
                        // vm.$emit('alert', { t: '错误', b: '卖家手机号码无效' })
                         alert('卖家手机号码无效')                                                                      
                    }
                    ok = false
                }
            }
            //real_seller_mobile
            if (variable.name == 'real_seller_mobile') {
                var ts = /^1(3|4|5|7|8)\d{9}$/.test(variable.value)
                if (!ts) {
                    if (ok) {
                        // vm.$emit('alert', { t: '错误', b: '真实房东电话号码无效' })
                         alert('真实房东电话号码无效')                                              
                    }
                    ok = false
                }
            }
            //非法词汇判断
            if (variable.name == "house_title" || variable.name == "house_desc") {
                // $rootScope.censorWords.forEach(function (w) {
                //     if (variable.value.indexOf(w) > -1) {
                //         if (ok) {
                //             vm.$emit('alert', { t: '错误', b: p.name + ',' + w + ',' + '违反国家广告法规定，请使用其他词汇替代' })
                //         }
                //         ok = false
                //     }
                // })
            }
            //楼层不能大于总楼层 floor total_floor
            if (variable.name == "floor") {
                floor = variable.value
            }
            if (variable.name == "total_floor") {
                total_floor = variable.value
            }
            if ((floor != undefined) && (total_floor != undefined)) {
                if (floor > total_floor) {
                    if (ok) {
                         alert('楼层不能大于总楼层')                      
                        // vm.$emit('alert', { t: '错误', b: '楼层不能大于总楼层' })
                    }
                    ok = false
                }
            }
            //判断不能为空
            if (p.required && (variable.value === null || variable.value === "" || variable.value === undefined)) {
                // if (variable.value === null || variable.value === "") {
                if (ok) {
                    alert(p.name + '不能为空')
                    // vm.$emit('alert', { t: '错误', b: p.name + '不能为空' })
                }
                ok = false
            } else {
                variables.push(variable)
            }
        })

        if (ok) {
            vm.submitTask(variables)
        }
    }


   onFileChange(e){
     console.log(e.target.files[0])
   }

   designUrls = []
   innerUrls = []
 
   getDesignBlobs (e) {
        let vm = this
        console.log(e.target.files[0])
        if (e) {
            let f = new FormData()
            f.append('photo',e.target.files[0])
            axios({
                method:'post',
                url: '/api/storage/photos',
                data: f
            }).then(function (res) {
                // http://7xj5ck.com1.z0.glb.clouddn.com/2015-11-28T06%3A11%3A25.113Z// console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data.key + JSON.stringify(resp.data))
                vm.designUrls.push(res.data.url)
                // console.log(vm.designUrls);
            })
        }
    }
    deleteDesignImg = function (index) { //删除图片
        let vm = this
        // vm.designBlobs.splice(index, 1)
        vm.designUrls.splice(index, 1)
        // console.log(vm.designUrls)
    }
    //室内图
    getInnerBlobs = function (e) {
         let vm = this
        console.log(e.target.files[0])
        if (e) {
            let f = new FormData()
            f.append('photo',e.target.files[0])
            axios({
                method:'post',
                url: '/api/storage/photos',
                data: f
            }).then(function (res) {
                vm.innerUrls.push(res.data.url)
                // console.log(vm.designUrls);
            })
        }
    }
    deleteInnerImg (index) { //删除图片
        let vm = this
        // vm.innerBlobs.splice(index, 1)
        vm.innerUrls.splice(index, 1)
        // console.log(vm.innerUrls)
    }

    src: string = "";
    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 800,
        resizeMaxWidth: 800
    };

    dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

    selectedDesignBlobs(imageResult: ImageResult) {
        let vm =  this
        // console.log(imageResult);
        // this.src = imageResult.resized
        //     && imageResult.resized.dataURL
        //     || imageResult.dataURL;

        console.log(this.src);    
        let f = new FormData()
        let imgBlob = vm.dataURItoBlob(imageResult.resized.dataURL)
        let name = new Date().getTime()+'.jpeg';
        let imgFile = new File([imgBlob], name);
        // console.log(imgBlob,imgFile);
        f.append('photo',imgFile)
        axios({
            method:'post',
            url: '/api/storage/photos',
            data: f
        }).then(function (res) {
            vm.designUrls.push(res.data.url)
        })
    }

}
