import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'MyApp',
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: string, icon: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authService: AuthService,
    public translate: TranslateService,
    public storage: StorageService) {

    this.initializeApp();

    this.pages = [
      { title: '', component: 'ProfilePage', icon: 'person'},
      { title: '', component: 'CategoriesPage', icon: 'list-box' },
      { title: '', component: 'CartPage', icon: 'cart' },
      { title: '', component: '', icon: 'close' }
    ];

    translate.get("PROFILE").subscribe(
      value => {
        this.pages[0].title = value;
      }
    );

    translate.get("CATEGORIES").subscribe(
      value => {
        this.pages[1].title = value;
      }
    );

    translate.get("SHOPPING_CART").subscribe(
      value => {
        this.pages[2].title = value;
      }
    );

    translate.get("LOGOUT").subscribe(
      value => {
        this.pages[3].title = value;
      }
    );

  }

  initializeApp() {
    if( this.storage.getLanguage() == null ) {
      let sysLang = window.navigator.language;
      if( sysLang.startsWith("pt") ) {
        this.storage.setLanguage("pt");
        this.storage.setCurrency("BRL");
      } else {
          this.storage.setLanguage("en");
          this.storage.setCurrency("USD");
      }
    }
    
    this.translate.setDefaultLang(this.storage.getLanguage());
    this.translate.use(this.storage.getLanguage());

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  openPage( page: {title: string, component: string} ) {
    switch(page.component) {
      case '':
        this.authService.logout();
        this.nav.setRoot(this.rootPage);
        break;
      default:
        this.nav.setRoot(page.component);
        break;
    }
  }

  changeLanguage(lang: string) {
    this.storage.setLanguage(lang);
    this.translate.use(lang);

    window.location.reload();
    this.nav.setRoot(this.rootPage);
  }

  isLanguageSelected(lang: string) : boolean {
    return (this.translate.currentLang == lang);
  }

  changeCurrency(currency: string) {
    this.storage.setCurrency(currency);
    
    window.location.reload();
    this.nav.setRoot(this.rootPage);
  }

  isCurrencySelected(currency: string) : boolean {
    return (this.storage.getCurrency() == currency);
  }

}
