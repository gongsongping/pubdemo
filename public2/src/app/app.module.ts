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
import { Sellcommission } from '../pages/sellcommission/sellcommission';
import { Sellrecord } from '../pages/sellrecord/sellrecord';
import { About } from '../pages/about/about';
import { Consultant } from '../pages/consultant/consultant';
import { Servicecall } from '../pages/servicecall/servicecall';
import { Visitrecord } from '../pages/visitrecord/visitrecord';

import { NestedCom, House, TestService, ImgPipe, HouseTypePipe } from '../providers/services';


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
    Sellrecord,
    Sellcommission,
    About,
    Consultant,
    Servicecall,
    Visitrecord,
    HouseTypePipe
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
    Tabs,
    Sellrecord,
    Sellcommission,
    About,
    Consultant,
    Servicecall,
    Visitrecord
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, TestService]
})
export class AppModule { }
