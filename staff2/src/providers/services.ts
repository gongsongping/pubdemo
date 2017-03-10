import { Component, Input, Output, EventEmitter } from '@angular/core';


/*
  Generated class for the NestedCom provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Component({
  selector: 'modal-resetpw',
  template:`
    <div>modal-resetpw</div>
  `
})
export class ModalResetpw {
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