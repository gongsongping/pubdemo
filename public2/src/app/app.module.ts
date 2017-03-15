import { NgModule, ErrorHandler } from '@angular/core';
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

import { NestedCom, House, TestService, ImgPipe } from '../providers/services';


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
    Housedetails,
    Precise,
    Tabs
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, TestService]
})
export class AppModule { }
