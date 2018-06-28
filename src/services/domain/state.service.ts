import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { StateDTO } from "../../models/state.dto";
import { Observable } from "rxjs/Rx";

@Injectable()

export class StateService {

    constructor(public httpClient: HttpClient) {
    }

    fetchAll() : Observable<StateDTO[]> {
        return this.httpClient.get<StateDTO[]>(`${API_CONFIG.baseUrl}/states`);
    }

}