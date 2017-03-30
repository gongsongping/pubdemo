import { NgModule, ErrorHandler, enableProdMode } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Tabs } from '../pages/tabs/tabs';
import { Buy } from '../pages/buy/buy';
import { Sell } from '../pages/sell/sell';
import { Mine } from '../pages/mine/mine';
import { Login } from '../pages/login/login';
import { Housedetails } from '../pages/housedetails/housedetails';
import { Precise } from '../pages/precise/precise';
import { Sellcommission } from '../pages/sellcommission/sellcommission';
import { Sellrecord } from '../pages/sellrecord/sellrecord';
import { About } from '../pages/about/about';
import { Consultant } from '../pages/consultant/consultant';
import { Servicecall } from '../pages/servicecall/servicecall';
import { Visitrecord } from '../pages/visitrecord/visitrecord';
import { Districtdetails } from '../pages/districtdetails/districtdetails';
import { Message } from '../pages/message/message';

import { NestedCom, House, TestService, ImgPipe, HouseTypePipe, Distribution } from '../providers/services';

// let prodMode: boolean = window.hasOwnProperty('cordova');//!!window.cordova;
// ionicBootstrap(MyApp, [], {prodMode: prodMode});
// import {enableProdMode} from '@angular/core';
enableProdMode();

@NgModule({
  declarations: [
    MyApp,
    Home,
    Buy,
    Sell,
    Mine,
    Login,
    Housedetails,
    Precise,
    Tabs,
    ImgPipe,
    NestedCom,
    House,
    Distribution,
    Sellrecord,
    Sellcommission,
    About,
    Consultant,
    Servicecall,
    Visitrecord,
    HouseTypePipe,
    Districtdetails,
    Message
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Buy,
    Sell,
    Mine,
    Login,
    Housedetails,
    Precise,
    Tabs,
    Sellrecord,
    Sellcommission,
    About,
    Consultant,
    Servicecall,
    Visitrecord,
    Districtdetails,
    Message
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, TestService]
})
export class AppModule { }
