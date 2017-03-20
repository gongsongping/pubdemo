import { Component, Input, Output, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import axios from 'axios';

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
  templateUrl:'_house.html'
  // template: ` `
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
    // console.log('house content init');
    // let vm = this
    // let url = '/api/housing/subdistricts/' + vm.h.subdistrict.id
    // axios
    //   .get(url)
    //   .then(function (res) {
    //     console.log(res)
    //     vm.he = res.data.hkId;
    //   })
    //   .catch(function (error) {
    //     alert('服务器错误');
    //     console.log(error);
    //   });
    // let url1 = '/api/account/employees/' + vm.h.hkId
    // axios
    //   .get(url1)
    //   .then(function (res) {
    //     console.log(res)
    //     vm.hkName = res.data.hkId;
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
    //     console.log(res)
    //       vm.referrerName = vm.referrerName.concat(res.data.data);
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
    //     console.log(res)
    //       vm.referrerName = vm.referrerName.concat(res.data.data);
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



