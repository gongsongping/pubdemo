import { Injectable, Pipe, PipeTransform, Component, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import axios from 'axios';


@Pipe({ name: 'ImgPipe' })
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

@Pipe({ name: 'HouseTypePipe' })
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


@Component({
  selector: 'nested-com',
  template: `<div>
     <h2>from nested-com | {{title}}</h2>
     <span (click)='onClick()'>Click me please!</span>  
  </div>`
})
export class NestedCom {
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
  templateUrl: '_house.html'
})
export class House {
  @Input() h: any;
  @Input() hId: any;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    // console.log('Hello nested content Provider');
  }
  img:any
  ngOnInit() {
    // console.log('nested content init');
    let vm = this
    if (vm.h){
       let imgs = JSON.parse(vm.h.images)
       if (imgs.length){
         vm.img = imgs[0]
       } else {
         vm.img = ''
       }
    }
    if (vm.hId){
      let url = '/api/housing/houses/' + vm.hId
      axios
        .get(url)
        .then(function (res) {
          console.log(res)
          vm.h = res.data
            if (vm.h){
              let imgs = JSON.parse(vm.h.images)
              if (imgs.length){
                vm.img = imgs[0]
              } else {
                vm.img = ''
              }
            }
        })

    }
  }
  //   onClick(){
  //     this.notify.emit('Click from nested content');
  //   }
}


@Injectable()
export class TestService {
  public message: any = "I'm a testservice message";
  constructor(public http: Http) {
    console.log('Hello TestService Provider');
  }
  test() {
    console.log('this is from test-service provider')
  }
}
