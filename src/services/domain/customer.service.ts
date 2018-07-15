import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { CustomerDTO } from "../../models/customer.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()

export class CustomerService {

    constructor(
        public httpClient: HttpClient,
        public storageService: StorageService,
        public imageUtilService: ImageUtilService) {
    }

    fetchByEmail(email: string) {
        return this.httpClient.get(
            `${API_CONFIG.baseUrl}/customers/email?value=${email}`);
    }

    fetchById(id: string) {
        return this.httpClient.get(
            `${API_CONFIG.baseUrl}/customers/${id}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.httpClient.get( url, {responseType: 'blob'} );
    }

    insert(customer: CustomerDTO) {
        return this.httpClient.post(
            `${API_CONFIG.baseUrl}/customers`,
            customer,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    uploadProfilePicture(picture: string) {
        let blobPicture = this.imageUtilService.dataUriToBlob(picture);

        let formData: FormData = new FormData();
        formData.set("file", blobPicture, "file.png");

        return this.httpClient.post(
            `${API_CONFIG.baseUrl}/customers/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

}