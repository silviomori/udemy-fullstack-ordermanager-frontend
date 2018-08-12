import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart.item';
import { CartService } from '../../services/domain/cart.service';
import { ProductDTO } from '../../models/product.dto';
import { StorageService } from '../../services/storage.service';

@IonicPage()

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})

export class CartPage {

  items: CartItem[]
  currency: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public storage: StorageService) {

      this.currency = this.storage.getCurrency();

  }

  ionViewDidLoad() {
    this.items = this.cartService.getCart().items;
  }

  increaseQuantity(product: ProductDTO) {
    this.items = this.cartService.increaseQuantity(product).items;
  }

  decreaseQuantity(product: ProductDTO) {
    this.items = this.cartService.decreaseQuantity(product).items;
  }

  removeProduct(product: ProductDTO) {
    this.items = this.cartService.removeProduct(product).items;
  }

  total() : number {
    return this.cartService.total();
  }

  keepShopping() {
    this.navCtrl.setRoot('CategoriesPage');
  }

  checkout() {
    this.navCtrl.push('PickAddressPage')
  }
}
