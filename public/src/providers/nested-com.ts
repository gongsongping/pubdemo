import { Component, Input, Output, EventEmitter } from '@angular/core';


/*
  Generated class for the NestedCom provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'nested-com',
  template:`<div>
     <h2>from nested-com | {{title}}</h2>
     <span (click)='onClick()'>Click me please!</span>  
  </div>`
})
export class NestedCom {
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