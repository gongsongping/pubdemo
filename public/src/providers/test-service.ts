import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TestService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
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
