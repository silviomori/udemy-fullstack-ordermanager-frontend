import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { ProductDTO } from '../../models/product.dto';

@Injectable()

export class ProductService {

  constructor(public httpClient: HttpClient) {
  }

  fetchById(productId: string) {
    return this.httpClient.get<ProductDTO>(`${API_CONFIG.baseUrl}/products/${productId}`);
  }

  fetchByCategory(categoryId : string, page: number = 0, linesPerPage: number = 24) {
    return this.httpClient.get(`${API_CONFIG.baseUrl}/products/`+
      `?categoryId=${categoryId}`+
      `&pageNumber=${page}`+
      `&linesPerPage=${linesPerPage}`);
  }

  getThumbnailsFromBucket(id: string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.httpClient.get(url, {responseType: 'blob'});
  }

  getImageFromBucket(id: string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
    return this.httpClient.get(url, {responseType: 'blob'});
  }

}