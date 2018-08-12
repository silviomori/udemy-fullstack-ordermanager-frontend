import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoryService } from '../services/domain/category.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { CustomerService } from '../services/domain/customer.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ProductService } from '../services/domain/product.service';
import { CartService } from '../services/domain/cart.service';
import { ImageUtilService } from '../services/image-util.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoryService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    CustomerService,
    ProductService,
    CartService,
    ImageUtilService,
    {
      provide: LOCALE_ID,
      useFactory: (translate: TranslateService) => {
        return translate.currentLang;
      },
      deps: [TranslateService]
    }
  ]
})

export class AppModule {
  constructor() {
    registerLocaleData(localePt);
  }
}

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader( httpClient, './assets/i18n/', '.json' );
}