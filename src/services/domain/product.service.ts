import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class ProductService {

  constructor(public httpClient: HttpClient) {
  }

  fetchByCategory(categoryId : string) {
    return this.httpClient.get(`${API_CONFIG.baseUrl}/products/?categoryId=${categoryId}`);
  }

  getThumbnailsFromBucket(id: string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.httpClient.get(url, {responseType: 'blob'});
  }

}