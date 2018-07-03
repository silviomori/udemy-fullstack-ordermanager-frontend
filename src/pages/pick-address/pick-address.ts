import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { StorageService } from '../../services/storage.service';
import { CustomerService } from '../../services/domain/customer.service';

@IonicPage()

@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})

export class PickAddressPage {

  items: AddressDTO[];

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
            this.items = response['addresses'];
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

}
