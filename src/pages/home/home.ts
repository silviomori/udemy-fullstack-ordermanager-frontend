import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredentialsDTO } from '../../models/credentials.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  credentialsDTO: CredentialsDTO = {
    email: "",
    password: ""
  };

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public authService: AuthService) {
  }

  ionViewWillEnter() {
    this.menuCtrl.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.authService.refreshToken()
      .subscribe(
        response => { 
          this.authService.successfulLogin(response.headers.get("Authorization")); 
          this.navCtrl.setRoot('CategoriesPage');
        },
        error => {}
      );
  }

  login() {
    this.authService.authenticate(this.credentialsDTO)
      .subscribe(
        response => { 
          this.authService.successfulLogin(response.headers.get("Authorization")); 
          this.navCtrl.setRoot('CategoriesPage');
        },
        error => {}
      );
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}
