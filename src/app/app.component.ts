import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@Component({
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
    public authService: AuthService) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: 'ProfilePage', icon: 'person'},
      { title: 'Categories', component: 'CategoriesPage', icon: 'list-box' },
      { title: 'Shopping Cart', component: 'CartPage', icon: 'cart' },
      { title: 'Logout', component: '', icon: 'close' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  openPage( page: {title: string, component: string} ) {
    switch(page.title) {
      case 'Logout':
        this.authService.logout();
        this.nav.setRoot('HomePage');
        break;
      default:
        this.nav.setRoot(page.component);
        break;
    }
  }

}
