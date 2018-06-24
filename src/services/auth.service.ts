import { Injectable } from "@angular/core";
import { CredentialsDTO } from "../models/credentials.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()

export class AuthService {

    constructor(public httpClient: HttpClient) {
    }

    authenticate(credentialsDTO: CredentialsDTO) {
        return this.httpClient.post(
            `${API_CONFIG.baseUrl}/login`,
            credentialsDTO,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}