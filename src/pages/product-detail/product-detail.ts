import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDTO } from '../../models/product.dto';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()

@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})

export class ProductDetailPage {

  item: ProductDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productService: ProductService) {
  }

  ionViewDidLoad() {
    let productId = this.navParams.get("productId");
    this.productService.fetchById(productId)
      .subscribe(
        response => {
          this.item = response;
          this.loadImageURLs();
        },
        error => {}
      );
  }

  loadImageURLs() {
    this.productService.getImageFromBucket(this.item.id)
      .subscribe(
        response => { this.item.imgUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg` },
        error => {}
      );
  }


}
