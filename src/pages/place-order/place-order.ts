import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InsertOrderDTO } from '../../models/insert.order.dto';
import { CartItem } from '../../models/cart.item';
import { CartService } from '../../services/domain/cart.service';
import { CustomerDTO } from '../../models/customer.dto';
import { AddressDTO } from '../../models/address.dto';
import { CustomerService } from '../../services/domain/customer.service';
import { OrderService } from '../../services/domain/order.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()

@Component({
  selector: 'page-place-order',
  templateUrl: 'place-order.html',
})

export class PlaceOrderPage {

  insertOrderDTO: InsertOrderDTO;
  cartItems: CartItem[];
  customerDTO: CustomerDTO;
  addressDTO: AddressDTO;

  transactionId: string;

  currency: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public customerService: CustomerService,
    public orderService: OrderService,
    public storage: StorageService) {

      this.currency = this.storage.getCurrency();

      this.insertOrderDTO = this.navParams.get('order');
  }

  ionViewDidLoad() {
    if( this.insertOrderDTO == null ) {
      this.backToShoopingCart();
      return;
    }

    this.cartItems = this.cartService.getCart().items; 
    if( this.cartItems.length == 0 ) {
      this.backToShoopingCart(); 
      return;
    }

    this.customerService.fetchById( this.insertOrderDTO.customerId )
      .subscribe(
        response => { 
          this.customerDTO = response as CustomerDTO;
          this.addressDTO = this.findAddress( this.insertOrderDTO.customerAddressId, response['addresses'] );
        },
        error => {}
    );
  }

  private findAddress(addressId: string, list: AddressDTO[]): AddressDTO {
    let index = list.findIndex( address => address.id == addressId );

    return list[index];
  }

  total(): number {
    return this.cartService.total();
  }

  backToShoopingCart() {
    this.navCtrl.setRoot('CartPage');
  }

  backToCategories() {
    this.navCtrl.setRoot('CategoriesPage');
  }

  placeOrder() {
    this.orderService.insert(this.insertOrderDTO)
      .subscribe(
        response => {
          this.cartService.createOrClearCart();
          this.transactionId = this.extractId(response.headers.get('location'));
        },
        error => {
          if( error.status == 403 ) {
            this.navCtrl.setRoot('HomePage');
          }
        }
      );
  }

  private extractId(location: string) {
    let index = location.lastIndexOf("/");
    return location.substring( index + 1 );
  }

}
