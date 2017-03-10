import { Component, Input, Output, EventEmitter } from '@angular/core';
import axios from 'axios';

/*
  Generated class for the NestedCom provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'modal-resetpw',
  template: `
    <div>modal-resetpw</div>
  `
})
export class ModalResetpw {
  @Input() title: any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    console.log('Hello NestedCom Provider');
  }
  ngOnInit() {
    console.log('nested-com init');
  }
  onClick() {
    this.notify.emit('Click from nested component');
  }
}

@Component({
  selector: 'house',
  template: `
  <ion-item>
            <img src="assets/img/img_null.png" width='70' height='70' />
            <a class="house-right">
                <div class="flex-row">
                    <p>
                        <i *ngIf="he !== 0">合</i>
                        <span style="font-weight:700;">{{h.subdistrict.name}}</span>
                    </p>
                    <p>
                        {{h.detailAddr}}
                    </p>
                </div>
                <div>
                    <span class="text">{{h.houseType}}&nbsp;/&nbsp;</span>
                    <span class="text">{{h.buildingArea}}m<sup>2</sup>&nbsp;/&nbsp;</span>
                    <span class="text" *ngIf="h.orientation == 1">西&nbsp;/&nbsp;</span>
                    <span class="text" *ngIf="h.orientation == 2">东&nbsp;/&nbsp;</span>
                    <span class="text" *ngIf="h.orientation == 3">北&nbsp;/&nbsp;</span>
                    <span class="text" *ngIf="h.orientation == 4">南&nbsp;/&nbsp;</span>
                    <span class="text" *ngIf="h.orientation == 5">南北&nbsp;/&nbsp;</span>
                    <span class="text" *ngIf="h.decorate == 1">毛坯</span>
                    <span class="text" *ngIf="h.decorate == 2">简装</span>
                    <span class="text" *ngIf="h.decorate == 3">精装</span>
                </div>
                <div>
                    <span class="positive" *ngIf="h.status == 0">初始状态</span>
                    <span class="positive" *ngIf="h.status == 1">实勘中</span>
                    <span class="positive" *ngIf="h.status == 2">已上架</span>
                    <span class="positive" *ngIf="h.status == 3">已下架</span>
                    <span class="positive" *ngIf="h.status == 4">已锁定</span>
                    <span class="positive" *ngIf="h.status == 5">已销售</span>
                    <strong class="price assertive">{{h.price}}万</strong>
                </div>
            </a>
        </ion-item>
        `
})
export class House {
  he = []
  hkName = []
  referrerName = []
  @Input() h: any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    console.log('Hello house content Provider');
  }
  ngOnInit() {
    console.log('house content init');
    // let vm = this
    // let url = '/api/housing/subdistricts/' + vm.h.subdistrict.id
    // axios
    //   .get(url)
    //   .then(function (res) {
    //     vm.he = res.data.hkId;
    //     console.log(vm.he)
    //   })
    //   .catch(function (error) {
    //     alert('服务器错误');
    //     console.log(error);
    //   });
    // let url1 = '/api/account/employees/' + vm.h.hkId
    // axios
    //   .get(url1)
    //   .then(function (res) {
    //     vm.hkName = res.data.hkId;
    //     console.log(vm.he)
    //   })
    //   .catch(function (error) {
    //     alert('服务器错误');
    //     console.log(error);
    //   });
    // if (vm.h.referrerId < 5000000) {
    //   let url2 = '/api/account/employees/' + vm.h.referrerId
    //   axios
    //     .get(url2)
    //     .then(function (res) {
    //       vm.referrerName = vm.referrerName.concat(res.data);
    //       console.log(vm.he)
    //     })
    //     .catch(function (error) {
    //       alert('服务器错误');
    //       console.log(error);
    //     });
    // }
    // if (vm.h.referrerId > 5000000) {
    //   let url3 = '/api/account/users/' + vm.h.referrerId
    //   axios
    //     .get(url3)
    //     .then(function (res) {
    //       vm.referrerName = vm.referrerName.concat(res.data);
    //       console.log(vm.he)
    //     })
    //     .catch(function (error) {
    //       alert('服务器错误');
    //       console.log(error);
    //     });
    // }
  }
  onClick() {
    this.notify.emit('Click from nested content');
  }
}

        // <div class="handle">
        //     <div>
        //         <a *ngIf="h.hkId != 0" href="tel:{{h.hkName.mobile}}"><img src="assets/img/staff/phone_line_btn.png" width="20" /></a>
        //         <p>
        //             房管家：
        //             <span *ngIf="h.hkId != 0">
				// 		{{h.hkName.name}}
				// 	</span>
        //             <span *ngIf="h.hkId == 0" style="color:#265fdf;">无</span>
        //         </p>
        //         <p>{{h.hkName.mobile}}</p>
        //     </div>
        //     <span class="spacing"></span>
        //     <div>
        //         <a *ngIf="h.referrerId" href="tel:{{h.referrerName.mobile}}"><img src="assets/img/staff/phone_line_btn.png" width="20" /></a>
        //         <p>
        //             推荐人<span style="font-size:.8em;color:#999;" *ngIf="h.referrerId > 5000000">(业主)</span>：
        //             <span *ngIf="h.referrerId">
				// 		{{h.referrerName.name}}
				// 	</span>
        //             <span *ngIf="!h.referrerId" style="color:#265fdf;">无</span>
        //         </p>
        //         <p>{{h.referrerName.mobile}}</p>
        //     </div>
        // </div>
@Component({
  selector: 'contact-pop',
  template:`
    <div>contact-pop</div>
  `
})
export class Contactpop {

  constructor() {
    console.log('contact pop ');
  }
  ngOnInit(){
    console.log('contact pop');
  }

}
