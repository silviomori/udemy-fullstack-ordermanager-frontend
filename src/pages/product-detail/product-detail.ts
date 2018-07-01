import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})

export class ProductDetailPage {

  product: ProductDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let productId = this.navParams.get("productId");
    this.productService.fetchById(productId)
      .subscribe(
        response => {
          this.product = response;
          this.loadImagesURLs();
        },
        error => {}
      );
  }

  private loadImagesURLs() {
    if( this.product.imgUrl == null ) {
        this.productService.getImageFromBucket(this.product.id)
        .subscribe(
            response => { this.product.imgUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.product.id}.jpg` },
            error => {}
        );
    }
    if( this.product.thumbnailUrl == null ) {
        this.productService.getThumbnailsFromBucket(this.product.id)
          .subscribe(
            response => { this.product.thumbnailUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.product.id}-small.jpg` },
            error => {}
          );
    }
  }

  addToCart() {
    this.cartService.addProduct(this.product);
    this.navCtrl.setRoot('CartPage');
  }
}
