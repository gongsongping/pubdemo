import { NgModule, ErrorHandler, enableProdMode } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';

import { Task } from '../pages/task/task';
import { Todo } from '../pages/todo/todo';
import { Tododetails } from '../pages/tododetails/tododetails';
import { Role } from '../pages/role/role';
import {  House, Handle, ImgPipe, HouseTypePipe } from '../providers/services';
import { Changepw } from '../pages/changepw/changepw';
import { Resetpw } from '../pages/resetpw/resetpw';
import { About } from '../pages/about/about';
import { Housemine } from '../pages/housemine/housemine';
import { Housesearch } from '../pages/housesearch/housesearch';
import { Message } from '../pages/message/message';
import { Contact } from '../pages/contact/contact';
import { Contactdetails } from '../pages/contactdetails/contactdetails';
import { Recommendbuyer } from '../pages/recommendbuyer/recommendbuyer';
import { MyRecommendbuyer } from '../pages/myRecommendbuyer/myRecommendbuyer';
import { Housevisitapply } from '../pages/housevisitapply/housevisitapply';
import { Houseclue } from '../pages/houseclue/houseclue';
import { Housedetails } from '../pages/housedetails/housedetails';
import { Districtdetails } from '../pages/districtdetails/districtdetails';
import { Ordermine } from '../pages/ordermine/ordermine';
import { Orderdetailsmine } from '../pages/orderdetailsmine/orderdetailsmine';
import { Housedetailsedit } from '../pages/housedetailsedit/housedetailsedit';
import { Customermine } from '../pages/customermine/customermine';
import { Customerdetailsmine } from '../pages/customerdetailsmine/customerdetailsmine';
import { Newrecord } from '../pages/newrecord/newrecord';

enableProdMode();


@NgModule({
  declarations: [
    MyApp,
    Home,
    Task,
    Todo,
    Tododetails,
    Changepw,
    Resetpw,
    About,
    Role,
    House,
    Handle,
    Housemine,
    Housesearch,
    Message,
    Contact,
    Contactdetails,
    Recommendbuyer,
    MyRecommendbuyer,
    Housevisitapply,
    Houseclue,
    ImgPipe,
    Ordermine,
    Orderdetailsmine,
    Housedetails,
    Districtdetails,
    HouseTypePipe,
    Housedetailsedit,
    Customermine,
    Customerdetailsmine,
    Newrecord
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode:'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Task,
    Todo,
    Tododetails,
    Changepw,
    Resetpw,
    About,
    Role,
    Housemine,
    Housesearch,
    Message,
    Contact,
    Contactdetails,
    Recommendbuyer,
    MyRecommendbuyer,
    Housevisitapply,
    Houseclue,
    Ordermine,
    Orderdetailsmine,
    Housedetails,
    Districtdetails,
    Housedetailsedit,
    Customermine,
    Customerdetailsmine,
    Newrecord
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
