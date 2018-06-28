import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CityDTO } from "../../models/city.dto";
import { Observable } from "rxjs/Rx";

@Injectable()

export class CityService {

    constructor(public httpClient: HttpClient) {
    }

    fetchAll(stateId: string) : Observable<CityDTO[]> {
        return this.httpClient.get<CityDTO[]>(`${API_CONFIG.baseUrl}/states/${stateId}/cities`);
    }

}