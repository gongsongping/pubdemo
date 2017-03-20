import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import axios from 'axios';

/*
  Generated class for the Ordermine page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ordermine',
  templateUrl: 'ordermine.html'
})
export class Ordermine {
  sub = []
  choosedidx: any = 0
  checkedp: any
  userId: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public params: NavParams) {}

  ionViewDidEnter(){
    let vm = this
    let orderType =''
    let missionIds = []
    let mission = []
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let userToken = JSON.parse(localStorage.getItem('tokens'))
    let bs64 = window.btoa(userInfo.username + ':' + userToken.access_token);
    vm.sub = [{title: '待处理', choose: true}, {title: '全部', choose: false}]
    vm.choosedidx = 0;
    vm.checkedp = this.sub[0];
    axios({
      method: 'POST',
      headers: {"Authorization": "Basic " + bs64},
      url: '/api/activiti/query/tasks',
      data: {
        assignee: userInfo.id,
        size: 999,
        order: 'desc',
      }
    }).then(function successCallback(res) {
      // console.log(res.data.data);
      if (res.data.data) {
        for (let t of res.data.data) {
          axios({
            method: 'GET',
            headers: {"Authorization": "Basic " + bs64},
            url:'/api/activiti/runtime/process-instances/' + t.processInstanceId + '/variables/mission_id?sort=creatDate',
          }).then(function successCallback(res2) {
            missionIds.push(res2.data.value);
            if (missionIds.length == res.data.data.length) {
              axios({
                method: 'get',
                url: '/api/mission/missions',
                params: {
                  idIn: JSON.stringify(missionIds),
                  // type: orderType,
                  sort: 'modifiedDate',
                  size: 999
                }
              }).then(function successCallback(res) {
                mission = res.data.data;
                console.log(mission);
                // $scope.noUnfinishOrders = !$scope.mission.length;
                // angular.forEach($scope.mission, function (j) {
                //   $scope.orderInfo(j);
                // })
              }, function errorCallback() {
              })
            }
          })
            .catch(function (error) {
            });
        }
      }
    })
      .catch(function (error) {
      });

  }

  //封装房屋信息
  orderInfo(t) {
    let vm = this
    let houseIdArr = []
    houseIdArr.push(t.houseId);
    axios.get('/api/housing/houses', {
      params: {
        idIn: JSON.stringify(houseIdArr),
        size: 999
      }
    })
      .then(function (res) {
        for (let j of res.data.data) {
          if (t.houseId == j.id) {
            t.houseInfo = j;
          }
        }
      })
      .catch(function (error) {
      });
  }





// ( $scope.exist = function (t, idx) {
//   $scope.choosedidx = 0;
//   $scope.checkidx = idx;
//   $scope.results = t;
//   $scope.toggle = false;
//   if (t == '全部') {
//     $scope.orderType = null;
//   } else if (t == '普通买房') {
//     $scope.orderType = 1;
//   } else if (t == '精准购房') {
//     $scope.orderType = 2;
//   } else if (t == '卖房') {
//     $scope.orderType = 3;
//   } else if (t == '房源上架') {
//     $scope.orderType = 9;
//   } else if (t == '房源下架') {
//     $scope.orderType = 8;
//   } else {
//     $scope.orderType = null;
//     $scope.results = $scope.pop[0];
//     $scope.checkidx = 0;
//   }
//   $scope.items = [];
//   $scope.start = 0;
//   $scope.size = 10;
//   $scope.houseIdArr = [];
//   $scope.unfinishedItems = [];
//   var params = {
//     pcId_OR_pcmId_OR_hkId_OR_hkmId_OR_wcId_OR_lsId_OR_nsId_OR_ctId_OR_csId: $stateParams.id,
//     size: 999,
//     start: $scope.start,
//     type: $scope.orderType
//   };
//   $scope.waitOrderLength = '';
//   //房屋信息接口
//   $scope.orderInfo = function (t) {
//     $scope.houseIdArr.push(t.houseId);
//     $http({
//       method: 'get',
//       url: $rootScope.baseUrl + '/api/housing/houses',
//       params: {
//         idIn: JSON.stringify($scope.houseIdArr),
//         size: 999
//       }
//     }).then(function successCallback(res) {
//       angular.forEach(res.data.data, function (j) {
//         if (t.houseId == j.id) {
//           t.houseInfo = j;
//         }
//       })
//     }, function errorCallback() {
//
//     })
//   }
//   $scope.mission = [];
//   $scope.tasks = [];
//   var bs64 = window.btoa($rootScope.user_name + ':' + $window.localStorage.access_token);
//   //待处理订单
//   $http({
//     method: 'POST',
//     headers: {"Authorization": "Basic " + bs64},
//     url: $rootScope.baseUrl + '/api/activiti/query/tasks',
//     data: {
//       assignee: $stateParams.id,
//       size: 999,
//       order: 'desc',
//     }
//   }).then(function successCallback(res) {
//     var missionIds = [];
//     if (res.data.data.length) {
//       angular.forEach(res.data.data, function (i) {
//         $http({
//           method: 'GET',
//           headers: {"Authorization": "Basic " + bs64},
//           url: $rootScope.baseUrl + '/api/activiti/runtime/process-instances/' + i.processInstanceId + '/variables/mission_id?sort=creatDate',
//         }).then(function successCallback(res2) {
//           missionIds.push(res2.data.value);
//           //missionIds加入完毕再执行下面请求
//           if (missionIds.length == res.data.data.length) {
//             $http({
//               method: 'get',
//               url: $rootScope.baseUrl + '/api/mission/missions',
//               params: {
//                 idIn: JSON.stringify(missionIds),
//                 type: $scope.orderType,
//                 sort: 'modifiedDate',
//                 size: 999
//               }
//             }).then(function successCallback(res) {
//               $scope.mission = res.data.data;
//               $scope.noUnfinishOrders = !$scope.mission.length;
//               angular.forEach($scope.mission, function (j) {
//                 $scope.orderInfo(j);
//               })
//             }, function errorCallback() {
//             })
//           }
//         }, function errorCallback() {
//         })
//       })
//     } else {
//       $scope.noUnfinishOrders = true;
//     }
//
//   }, function errorCallback() {
//   })
//   //全部订单
//   $http({
//     method: 'get',
//     url: $rootScope.baseUrl + '/api/mission/missions',
//     params: params,
//   }).then(function successCallback(res) {
//     $scope.items = res.data.data;
//     // $scope.start = $scope.start + 1;
//     // $scope.$broadcast('scroll.infiniteScrollComplete');
//     $scope.noOrders = !res.data.data.length;
//     $scope.orderLength = res.data.total;
//     angular.forEach($scope.items, function (t) {
//       $scope.orderInfo(t);
//     })
//   }, function errorCallback() {
//   })
// } )()
  chooseTab(t, idx) {
    // this.checkedp = t;
    this.choosedidx = idx;
  }
//   $scope.softings = function () {
//   $scope.toggle = !$scope.toggle;
// }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderminePage');
  }

}
