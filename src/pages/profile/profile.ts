import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { CustomerDTO } from '../../models/customer.dto';
import { CustomerService } from '../../services/domain/customer.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  customerDTO: CustomerDTO

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public customerService: CustomerService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if( localUser && localUser.email ) {
      this.customerService.fetchByEmail(localUser.email)
        .subscribe( 
          response => { 
            this.customerDTO = response;
            this.getImageIfExists();
          },
          error => {
            if( error.status == 403 ) {
              this.navCtrl.setRoot('HomePage');
            }
          }
        );
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists() {
    this.customerService.getImageFromBucket(this.customerDTO.id)
      .subscribe(
        response => {
          this.customerDTO.imgUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.customerDTO.id}.jpg`;
        }
      );
  }
}
