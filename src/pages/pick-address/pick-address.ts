import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressDTO } from '../../models/address.dto';
import { StorageService } from '../../services/storage.service';
import { CustomerService } from '../../services/domain/customer.service';
import { InsertOrderDTO } from '../../models/insert.order.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()

@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})

export class PickAddressPage {

  insertOrderDTO: InsertOrderDTO;
  items: AddressDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public customerService: CustomerService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if( localUser && localUser.email ) {
      this.customerService.fetchByEmail(localUser.email)
        .subscribe( 
          response => { 
            this.items = response['addresses'];

            let cart = this.cartService.getCart();

            this.insertOrderDTO = {
              customerId: response['id'],
              customerAddressId: null,
              paymentType: null,
              installments: null,
              orderItems: cart.items.map( item => { return {productId: item.product.id, quantity: item.quantity}})
            }
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

  nextPage( address: AddressDTO ) {
    this.insertOrderDTO.customerAddressId = address.id;
    this.navCtrl.push("PaymentPage", {order: this.insertOrderDTO });
  }
}
