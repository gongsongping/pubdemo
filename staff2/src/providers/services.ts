import { Component, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { NavController} from 'ionic-angular';
import axios from 'axios';
import { Housedetails } from '../pages/housedetails/housedetails';
import { Tododetails } from '../pages/tododetails/tododetails';
// import _ from "lodash";
// import * as _ from "lodash";
import entries from "lodash/entries";
import assign from "lodash/assign";

/*
  Generated class for the NestedCom provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Pipe({name: 'ImgPipe'})
export class ImgPipe implements PipeTransform {
  transform(value: any): any {
        let ps;
        if (value) {
            ps = JSON.parse(value)
        }
        // console.log(ps)
        return ps
  }
}



@Pipe({name: 'HouseTypePipe'})
export class HouseTypePipe implements PipeTransform {
  transform(items: any): any {
        let ar, arr;
        let room = '', hall = '', kitchen = '', bathroom = '';
        if (items) {
            ar = items.split('-')
            arr = ar.map(function (a) {
                return parseInt(a)
            })
            if (arr[0]) {
                room = arr[0] + '室'
            }
            if (arr[1]) {
                hall = arr[1] + '厅'
            }
            if (arr[2]) {
                kitchen = arr[2] + '厨'
            }
            if (arr[3]) {
                bathroom = arr[3] + '卫'
            }
        }
        return room + hall + kitchen + bathroom
  }
}

@Pipe({name: 'DetailAddrPipe'})
export class DetailAddrPipe implements PipeTransform {
  transform(items: any): any {
        let arr;
        let Building = '';
        if (items) {
            arr = items.split('-')
            Building = arr[0] + '号楼'
        }
        return Building
  }
}
// @Component({
//   selector: 'modal-resetpw',
//   template: `
//     <div>modal-resetpw</div>
//   `
// })
// export class ModalResetpw {
//   @Input() title: any;
//   @Output() notify: EventEmitter<any> = new EventEmitter<any>();
//   constructor() {
//     console.log('Hello NestedCom Provider');
//   }
//   ngOnInit() {
//     console.log('nested-com init');
//   }
//   onClick() {
//     this.notify.emit('Click from nested component');
//   }
// }

@Component({
  selector: 'house',
  templateUrl:'_house.html'
  // template: ` `
})
export class House {
  he = []
  hkName = []
  // hk = {mobile:'0998',name:'ddd'}
  hk:any
  referrerName = []
  referrer:any
  @Input() h: any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  constructor(public navCtrl: NavController) {
    console.log('Hello house content Provider');
  }
  ngOnInit() {
    // console.log('--house content init---');
    let vm = this
    if(!vm.h.referrerId || vm.h.hkId == 0){
       return vm.referrer = {
         name: '无',
         mobile: ''
       }
    }
    let url = '/api/housing/subdistricts/' + vm.h.subdistrict.id
    axios
      .get(url)
      .then(function (res) {
        vm.he = res.data;
      })
 
    let url1 = '/api/account/employees/' + vm.h.hkId
    axios
      .get(url1)
      .then(function (res) {
        vm.hk = res.data;
        console.log(vm.hk)
      })
  
    if (vm.h.referrerId < 5000000) {
      let url2 = '/api/account/employees/' + vm.h.referrerId
      axios
        .get(url2)
        .then(function (res) {
          vm.referrer = res.data          
        })
    }
    if (vm.h.referrerId > 5000000) {
      let url3 = '/api/account/users/' + vm.h.referrerId
      axios
        .get(url3)
        .then(function (res) {
          vm.referrer = res.data
        })
    }

  }
  
  goDetail(h) {
        console.log(h)
        this.navCtrl.push(Housedetails, { house: h , enter: '1' })
  }
  onClick() {
    this.notify.emit('Click from nested content');
  }
}


@Component({
  selector: 'handle',
  template: `
            <div class="handle">
                <div class="handle-hk border-spacing">
                    <div>
                        <p>
                            推荐人<span style="font-size:.8em;color:#999;" *ngIf="h.referrerId > 5000000">(业主)</span>：
                            <span>{{referrer?.name}}</span>
                        </p>
                        <p *ngIf="referrer?.mobile !== ''">{{referrer?.mobile}}</p>
                    </div>
                    <a ion-button full *ngIf="referrer?.mobile !== ''" href="tel:{{referrer?.mobile}}"><img src="assets/img/staff/phone_line_btn.png" width="20" /></a>
                </div>
            </div>
            `
})
export class Handle {
  hk:any
  referrerName = []
  referrer:any
  @Input() h: any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    console.log('Hello house content Provider');
  }
  ngOnInit() {
    let vm = this
    if(!vm.h.referrerId){
       return vm.referrer = {
         name: '无',
         mobile: ''
       }
    }
    if (vm.h.referrerId < 5000000) {
      let url1 = '/api/account/employees/' + vm.h.referrerId
      axios
        .get(url1)
        .then(function (res) {
          vm.referrer = res.data          
        })
    }
    if (vm.h.referrerId > 5000000) {
      let url2 = '/api/account/users/' + vm.h.referrerId
      axios
        .get(url2)
        .then(function (res) {
          vm.referrer = res.data
        })
    }

  }
  onClick() {
    this.notify.emit('Click from nested content');
  }
}


@Component({
  selector: 'todoitem',
  // templateUrl:'_todoitem.html'
  template: ` 
	<div class="todoitem" >
		<ion-list>
			<ion-list-header>您收到一条“{{todo?.name}}”任务</ion-list-header>
			<ion-item>
        <div *ngFor="let d of descriptionMap" style="margin:10px;">
          <p *ngIf="d.name == 'mission_id'"><span>订单编号：</span>{{d.details?.serialNumber}}</p>
          <p *ngIf="d.name == 'seller_id'"><span>{{d.nameCn}}：</span>{{d.details?.name}}&nbsp;{{d.details?.mobile}}</p>
          <p *ngIf="d.name == 'buyer_id'"><span>{{d.nameCn}}：</span>{{d.details?.name}}&nbsp;{{d.details?.mobile}}</p>
          <p *ngIf="d.name == 'house_addr'"><span>房源地址：</span>{{d.value}}</p>
         
        </div>
				<div class="see" (click)='goDetail()'>
					<img src="assets/img/icon/_0013_seeright.png" width="16">
					<span>查看详情 </span>
				</div>
			</ion-item>
		</ion-list>
	</div>`
})
export class Todoitem {
  @Input() todo: any;
  variables:any;
  descriptionMap = [];

  constructor(public navCtrl: NavController) {}
  
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
  ngOnInit() {
    let vm = this
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let tokens = JSON.parse(localStorage.getItem('tokens'));
    let bs64 = window.btoa(userInfo.username + ':' + tokens.access_token)

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
            // setTimeout(()=>{
            //   console.log(vm.descriptionMap);
            // },2000)
        })
        
  }
  
  goDetail() {
     this.navCtrl.push(Tododetails, { todo: this.todo, variables: this.variables, descriptionMap: this.descriptionMap })
  }
  
}