import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
<<<<<<< HEAD
=======
import { Home } from '../pages/home/home';
import { LoginModal, NestedContent } from '../providers/services';
>>>>>>> 7f43978c00f3c17ce0409c89e5384252c61f013b


@NgModule({
  declarations: [
    MyApp,
    Home,
    Page1,
    Page2,
    LoginModal,
    NestedContent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Page1,
    Page2,
    LoginModal,
    NestedContent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
