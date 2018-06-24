import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoryDTO } from "../../models/category.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoryService {

    constructor(public httpClient: HttpClient) {
    }

    fetchAll() : Observable<CategoryDTO[]> {
        return this.httpClient.get<CategoryDTO[]>(`${API_CONFIG.baseUrl}/categories`);
    }

}