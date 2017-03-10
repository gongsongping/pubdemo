import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Tabs } from '../pages/tabs/tabs';
import { Buy } from '../pages/buy/buy';
import { Sell } from '../pages/sell/sell';
import { Mine } from '../pages/mine/mine';
import { Login } from '../pages/login/login';
import { HouseDetail } from '../pages/house-detail/house-detail';
import { Precise } from '../pages/precise/precise';

import { NestedCom, House, TestService, ImgPipe } from '../providers/services';


@NgModule({
  declarations: [
    MyApp,
    Home,
    Buy,
    Sell,
    Mine,
    Login,
    HouseDetail,
    Precise,
    Tabs,
    ImgPipe,
    NestedCom,
    House
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true,
      mode:'ios',
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
    HouseDetail,
    Precise,
    Tabs
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, TestService]
})
export class AppModule { }
