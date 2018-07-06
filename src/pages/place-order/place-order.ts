import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InsertOrderDTO } from '../../models/insert.order.dto';
import { CartItem } from '../../models/cart.item';
import { CartService } from '../../services/domain/cart.service';
import { CustomerDTO } from '../../models/customer.dto';
import { AddressDTO } from '../../models/address.dto';
import { CustomerService } from '../../services/domain/customer.service';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public customerService: CustomerService) {

    this.insertOrderDTO = this.navParams.get('order');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.customerService.fetchById( this.insertOrderDTO.customerId.id )
      .subscribe(
        response => { 
          this.customerDTO = response as CustomerDTO;
          this.addressDTO = this.findAddress( this.insertOrderDTO.customerAddressId.id, response['addresses'] );
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
}
