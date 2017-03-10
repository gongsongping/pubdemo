import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';

import { Task } from '../pages/task/task';
import { Todo } from '../pages/todo/todo';
import { Tododetails } from '../pages/tododetails/tododetails';
import { Role } from '../pages/role/role';
import { ModalResetpw, House } from '../providers/services';
import { Changepw } from '../pages/changepw/changepw';
import { Resetpw } from '../pages/resetpw/resetpw';
import { About } from '../pages/about/about';
import { Housemine } from '../pages/housemine/housemine';
import { Housesearch } from '../pages/housesearch/housesearch';
import { Message } from '../pages/message/message';



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
    ModalResetpw,
    House,
    Housemine,
    Housesearch,
    Message
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    ModalResetpw,
    Housemine,
    Housesearch,
    Message
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
