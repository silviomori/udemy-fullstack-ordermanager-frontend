import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { InsertOrderDTO } from "../../models/insert.order.dto";

@Injectable()

export class OrderService {

    constructor(public httpClient: HttpClient) {
    }

    insert(order: InsertOrderDTO) {
        return this.httpClient.post(
            `${API_CONFIG.baseUrl}/orders`,
            order,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}