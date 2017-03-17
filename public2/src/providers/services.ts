import { Injectable, Pipe, PipeTransform, Component, Input, Output, EventEmitter  } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



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
  selector: 'house',
  template:`
  <ion-item style="padding-left:0px;">
      <ion-thumbnail item-left>
        <img src="{{(h.images | ImgPipe)[0]}}">
      </ion-thumbnail>
      <h2>{{h.name}}</h2>
      <p>{{h.description}}</p>
      <p>ll</p>
      <p>ll</p>
    </ion-item>`
})
export class House {
  @Input() h:any;
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


@Injectable()
export class TestService {
  public message: any = "I'm a testservice message";
  constructor(public http: Http) {
    console.log('Hello TestService Provider');
  }
  test(){
    console.log('this is from test-service provider')
  }
}
