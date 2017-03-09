import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Tabs } from '../pages/tabs/tabs';
import { TestService } from '../providers/test-service';
import { Buy } from '../pages/buy/buy';
import { Sell } from '../pages/sell/sell';
import { Mine } from '../pages/mine/mine';
import { Login } from '../pages/login/login';
import { ImgPipe } from "../providers/img-pipe";
import { HouseDetail } from '../pages/house-detail/house-detail';
import { Precise } from '../pages/precise/precise';
import { NestedCom,NestedContent } from '../providers/nested-com';


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
    NestedContent
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true,
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
