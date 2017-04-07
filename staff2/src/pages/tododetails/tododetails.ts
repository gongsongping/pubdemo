import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios'
import entries from "lodash/entries";
import assign from "lodash/assign";
// import { Districtdetails } from '../districtdetails/districtdetails';
import { Housedetails } from '../housedetails/housedetails';

// import { Camera, CameraOptions } from 'ionic-native';
import { Camera, CameraOptions }  from  "@ionic-native/camera"


// , File as FileSystem
// interface Window {
//   imagePicker: any;
// }
// declare var window: Window;

// import { ImagePicker } from '@ionic-native/image-picker';

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
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {}
  
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
  userInfo
  tokens
  deptMembers:any
  ionViewWillEnter() {
    let vm = this
    vm.todo = vm.navParams.get('todo')
    vm.variables = vm.navParams.get('variables')
    vm.descriptionMap = vm.navParams.get('descriptionMap')
    console.log(vm.descriptionMap);    

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.tokens = JSON.parse(localStorage.getItem('tokens'));
    let bs64 = window.btoa(this.userInfo.username + ':' + this.tokens.access_token)

    axios({
        method: 'get',
        headers: { "Authorization": "Basic " + bs64 },
        url: '/api/activiti/form/form-data?taskId=' + vm.todo.id
    }).then(function successCallback(res) {
            vm.formData = res.data
            vm.formProperties = res.data.formProperties
            console.log(vm.formData, vm.formProperties);
        })

    axios({
        method: 'get',
        url: '/api/account/employees?departmentId=' + vm.userInfo.department.id
    }).then(function successCallback(res) {
            vm.deptMembers = res.data.data
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


  ionViewDidEnter() {}  
   //转派任务

  reassign () {
      let vm  = this
      console.log('---',vm.house.assignee,'----');
      if (!vm.house.assignee){
        alert('请选择转派对象')
        return
      }
      let bs64 = window.btoa(this.userInfo.username + ':' + this.tokens.access_token)
      axios({
          method: 'put',
          headers: { "Authorization": "Basic " + bs64 },
          data: {
              assignee: vm.house.assignee
          },
          url: '/api/activiti/runtime/tasks/' + vm.todo.id
      }).then(function () {
              alert('提交成功')
              vm.navCtrl.pop()
          }).catch(function () {
              alert('服务器错误')              
          })
  }

  // var bs64 = window.btoa($rootScope.user_name + ':' + $window.localStorage.access_token)
  submitTask (v) {
    console.log(v);
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
              alert('提交成功')
              vm.navCtrl.pop()
          }).catch(function errorCallback() {
              alert('服务器错误')                
          })
  }
    //日期选择

    house:any = {} // = {room:'',hall:'',kitchen:'',bathroom:''} //room: 0, hall: 0, kitchen: 0, bathroom: 0
    endTask () {
        let vm = this
        let variables = []
        let ok = true
        let floor, total_floor;
        vm.formProperties.forEach(function (p) {
            let variable:any = {}
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
            if (p.type == 'boolean') {
                variable.value = JSON.parse(p.value)
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
  
    deleteDesignImg = function (index) { //删除图片
        let vm = this
        // vm.designBlobs.splice(index, 1)
        vm.designUrls.splice(index, 1)
        // console.log(vm.designUrls)
    }
    
    deleteInnerImg (index) { //删除图片
        let vm = this
        // vm.innerBlobs.splice(index, 1)
        vm.innerUrls.splice(index, 1)
        // console.log(vm.innerUrls)
    }

      options: CameraOptions = {
        quality: 50,
        targetWidth: 700,
        targetHeight: 700,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        // mediaType: Camera.MediaType.PHOTOLIBRARY
      }

     innerCapture(){
       let vm = this
        vm.camera.getPicture(vm.options).then((imageData) => {
           let base64Image = 'data:image/jpeg;base64,' + imageData;
           let file = vm.dataURItoBlob(base64Image)
          //  console.log(base64Image);
            let form = new FormData()
            form.append('photo', file)
            axios({
                method:'post',
                url: '/api/storage/photos',
                data: form
            }).then(function (res) {
                vm.innerUrls.push(res.data.url)
                console.log(vm.innerUrls);
            }).catch(function (err) {
                console.log(JSON.stringify(err));
            })
        }, (err) => {
           // Handle error
        });
     }

     designCapture(){
       let vm = this
        vm.camera.getPicture(vm.options).then((imageData) => {
           let base64Image = 'data:image/jpeg;base64,' + imageData;
           let file = vm.dataURItoBlob(base64Image)
            // console.log(base64Image);
            // let fblob = new File([file], new Date().getTime()+'.jpeg');           
            let form = new FormData()
            form.append('photo', file)
            axios({
                method:'post',
                url: '/api/storage/photos',
                data: form
            }).then(function (res) {
                vm.designUrls.push(res.data.url)
                console.log(vm.designUrls);
            }).catch(function (err) {
                console.log(JSON.stringify(err));
            })
        }, (err) => {
           // Handle error
        });
     }


    dataURItoBlob(dataURI) {
        let byteString = atob(dataURI.split(',')[1]);
        // console.log(byteString);
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        // let blob = new Blob([ab], { type: 'image/jpeg' });
        // console.log(typeof blob,JSON.stringify(blob));
        // let fblob = new File([blob], String(new Date().getTime())+'.jpeg');       
        // console.log(typeof fblob, JSON.stringify(fblob)); 
        return new Blob([ab], { type: 'image/jpeg' });
    }

}





// //室内图
//     getInnerBlobs (imageResult: ImageResult) {
//          let vm = this
//         if (imageResult) {
//             let f = new FormData()
//             let imgBlob = vm.dataURItoBlob(imageResult.resized.dataURL)
//             let name = new Date().getTime()+'.jpeg';
//             let imgFile = new File([imgBlob], name);
//             // console.log(imgBlob,imgFile);
//             f.append('photo',imgFile)
//             axios({
//                 method:'post',
//                 url: '/api/storage/photos',
//                 data: f
//             }).then(function (res) {
//                 vm.innerUrls.push(res.data.url)
//                 // console.log(vm.designUrls);
//             })
//         }
//     }
//     getInnerBlobsF (e) {
//          let vm = this
//         if (e) {
//             console.log(e.target.files[0]);
//             this.ng2ImgToolsService.resize([e.target.files[0]], 800, 800).subscribe(result => {
//                 //all good, result is a file
//                 console.log(result);
//                 let f = new FormData()
//                 f.append('photo', result)
//                 axios({
//                     method:'post',
//                     url: '/api/storage/photos',
//                     data: f
//                 }).then(function (res) {
//                     vm.innerUrls.push(res.data.url)
//                     // console.log(vm.designUrls);
//                 })
//             }, error => {
//                 //something went wrong //use result.compressedFile or handle specific error cases individually
//             });
//         }
//     }

// upload (targetPath){
//        console.info('upload');
//       let vm = this
//       //  axios.defaults.headers.common['Authorization'] = "Bearer " + this.tokens.access_token
//        let name = String(new Date().getTime())
//        let opt = {
//           fileKey: "photo",
//           fileName: name,
//           chunkedMode: false,
//           mimeType: "multipart/form-data",
//           params : {'photo': name},
//           headers: {
//             'Authorization': "Bearer " + vm.tokens.access_token
//           }
//         };
//         let url = axios.defaults.baseURL+'/api/storage/photos'
//         const fileTransfer = new Transfer();
//         // Use the FileTransfer to upload the image
//         fileTransfer.upload(targetPath, url, opt).then(data => {
//            console.log('transfer return data',JSON.stringify(data));
//         }, err => {
           
//         });
//      }

// options = {
//       maximumImagesCount: 1,
//       width: 800,
//       height: 800,
//       outputType: 1, //0 fileuri 1 base64_string
//       quality: 90
//     };

//      getDesignImgPicker (){
//        let vm = this
//        console.log('---design---imagePicker');
//         ImagePicker.getPictures(this.options).then((results) => {
//               console.log('Image URI: ' + results[0]);
//               window['resolveLocalFileSystemURL'](results[0], function(fileEntry) {
//                    console.log('file entry: ' + JSON.stringify(fileEntry));
//                    fileEntry.file(function (file) {
//                         console.log(JSON.stringify(file));                        
//                         let reader = new FileReader();
//                         reader.onloadend = function() {
//                             console.log("Successful file write: " + this.result);
//                             let blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });
//                             console.log(typeof blob,JSON.stringify(blob));
//                             let fblob = new File([blob], String(new Date().getTime())+'.jpeg');
//                             console.log(typeof fblob, JSON.stringify(fblob));
                           
//                             let form = new FormData()
//                             form.append('photo', fblob)
//                             axios({
//                                 method:'post',
//                                 url: '/api/storage/photos',
//                                 data: form
//                             }).then(function (res) {
//                                 vm.designUrls.push(res.data.url)
//                                 // console.log(vm.designUrls);
//                             }).catch(function (err) {
//                                 console.log(JSON.stringify(err));
//                             })
//                         };
//                         reader.readAsArrayBuffer(file);
//                     });
//               })
//         }, (err) => { });

//      }
    

//       getInnerImgPicker (){
//          let vm = this
//           console.log('---Inner---window.imagePicker');
//           window['imagePicker'].getPictures(function(results) {
//               console.log('Image URI: ' + results[0]);
//               vm.upload(results[0])

//               window['resolveLocalFileSystemURL'](results[0], function(fileEntry) {
//                    console.log('file entry: ' + fileEntry);
//                    console.log('file entry: ' + JSON.stringify(fileEntry));                   
//                    fileEntry.file(function (file) {
//                         console.log(JSON.stringify(file));                                                
//                         let reader = new FileReader();
//                         reader.onloadend = function() {
//                             console.log("Successful file write: " + this.result);
//                             let blob = new Blob([new Uint8Array(this.result)], { type: "image/jpeg" });

//                             console.log(typeof blob,JSON.stringify(blob));
//                             let fblob = new File([blob], String(new Date().getTime())+'.jpeg');
//                             console.log(typeof fblob, JSON.stringify(fblob));
//                             let form = new FormData()
//                             form.append('photo', this.result)
//                             axios({
//                                 method:'post',
//                                 url: '/api/storage/photos',
//                                 data: form
//                             }).then(function (res) {
//                                 vm.innerUrls.push(res.data.url)
//                                 // console.log(vm.designUrls);
//                             }).catch(function (err) {
//                                 console.log(JSON.stringify(err));
//                             })
//                         };
//                         reader.readAsArrayBuffer(file);
//                     });
//               })
//           }, function (error) {
//             console.log('Error: ' + error);
//           });

//      } 

//       //https://github.com/ribizli/ng2-imageupload 
//     // this.src = imageResult.resized
//     //     && imageResult.resized.dataURL
//     //     || imageResult.dataURL;
//    getDesignBlobs (imageResult: ImageResult) {
//         let vm = this
//         // console.log(imageResult);
//         if (imageResult) {
//             let f = new FormData()
//             let imgBlob = vm.dataURItoBlob(imageResult.resized.dataURL)
//             let name = new Date().getTime()+'.jpeg';
//             let imgFile = new File([imgBlob], name);
//             // console.log(imgBlob,imgFile);
//             f.append('photo',imgFile)
//             axios({
//                 method:'post',
//                 url: '/api/storage/photos',
//                 data: f
//             }).then(function (res) {
//                 // http://7xj5ck.com1.z0.glb.clouddn.com/2015-11-28T06%3A11%3A25.113Z// console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data.key + JSON.stringify(resp.data))
//                 vm.designUrls.push(res.data.url)
//                 // console.log(vm.designUrls);
//             })
//         }
//     }
//     getDesignBlobsF (e) {
//         let vm = this
//         if (e) {
//             console.log(e.target.files[0]);
//             this.ng2ImgToolsService.resize([e.target.files[0]], 800, 800).subscribe(result => {
//                 //all good, result is a file
//                 console.log(result);
//                 let f = new FormData()
//                 f.append('photo', result)
//                 axios({
//                     method:'post',
//                     url: '/api/storage/photos',
//                     data: f
//                 }).then(function (res) {
//                     vm.designUrls.push(res.data.url)
//                     // console.log(vm.designUrls);
//                 })
//             }, error => {
//                 //something went wrong //use result.compressedFile or handle specific error cases individually
//             });
//         }
//     }