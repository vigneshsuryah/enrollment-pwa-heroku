import {environment} from '../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FormsModule} from "@angular/forms";

import {SuiModule} from 'ng2-semantic-ui';

import {AppRoutingModule} from "./routing.module";
import {AppComponent} from './app.component';
import {EnrollCreateComponent} from './components/enroll-create/enroll-create.component';
import {MenuComponent} from './components/menu/menu.component';
import {EnrollListComponent} from './components/enroll-list/enroll-list.component';
import {FooterComponent} from './components/footer/footer.component';
import {InfoService} from "./shared/info.service";
import {PushNotificationService} from "./shared/push-notification.service";
import {EnrollCacheService} from "./shared/enroll-cache.service";
import {EnrollService} from "./shared/enroll.service";
import {HttpInterceptorService} from "./shared/http-interceptor.service";
import {NgHttpLoaderModule} from "ng-http-loader";
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    AppComponent,
    EnrollCreateComponent,
    MenuComponent,
    EnrollListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SuiModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production}),
    NgHttpLoaderModule,
    SignaturePadModule
  ],
  providers: [
    InfoService,
    PushNotificationService,
    EnrollCacheService,
    EnrollService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
