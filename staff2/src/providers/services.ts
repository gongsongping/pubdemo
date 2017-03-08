import { Component, Input, Output, EventEmitter } from '@angular/core';


/*
  Generated class for the NestedCom provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'login-modal',
  template:`<ion-header>

  <ion-navbar>
    <ion-title>login</ion-title>
  </ion-navbar>

</ion-header>

<ion-content class="login-bg-img">
  <div class='top'>
    <h1>壁虎好房</h1>
    <h5>开启互联网买房卖房新篇章</h5>
  </div>
  <div class='bottom' style="padding-top:20px;">

    <div style="margin:10px 10vw;width:80vw;position:relative;border-radius: 6px;">
      <p *ngIf='loginErr' style="text-align: center;color:tomato;">{{loginErr}}</p>
    </div>
    <ion-item style="margin:10px 10vw;padding-left:3px;width:80vw;border-radius: 6px;border:none;">
      <ion-icon item-left name="search" style="margin-right:0px;"></ion-icon>
      <input type="text" placeholder="输入手机号" [(ngModel)]="mobile" style="width:100%;border:none;border-radius: 5px;">
      <button (click)="getVericode()" ion-button small round item-right style="padding-left:2px;padding-right:2px;margin-right:0px;">发送验证码</button>
    </ion-item>
    <ion-item style="margin:10px 10vw;padding-left:3px;width:80vw;border-radius: 6px;border:none;">
      <ion-icon item-left name="search" style="margin-right:0px;"></ion-icon>
      <input type="text" placeholder="输入验证码" [(ngModel)]="validateCode" style="width:100%;border:none;border-radius: 5px;">
    </ion-item>

    <div style="margin:20px 10vw;width:80vw;">
      <button (click)="login()" ion-button full round color="primary">登录</button>
    </div>

  </div>

</ion-content>`
})
export class LoginModal {
  @Input() title:any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    console.log('Hello NestedCom Provider');
  }
  ngOnInit(){
    console.log('nested-com init');
  }
  onClick(){
    this.notify.emit('Click from nested component');
  }
}

@Component({
  selector: 'nested-content',
  template:`<div>
     <p>from  content | {{content}}</p>
  </div>`
})
export class NestedContent {
  @Input() content:any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    console.log('Hello nested content Provider');
  }
  ngOnInit(){
    console.log('nested content init');
  }
  onClick(){
    this.notify.emit('Click from nested content');
  }
}
