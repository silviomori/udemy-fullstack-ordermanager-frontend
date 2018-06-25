import { Injectable } from "@angular/core";
import { CredentialsDTO } from "../models/credentials.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';

@Injectable()

export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();
    constructor(
        public httpClient: HttpClient,
        public storageService: StorageService) {
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

    successfulLogin(authHeader: string) {
        let tkn = authHeader.substring(7); // Remove "Bearer " from the header
        let user : LocalUser = {
            token: tkn,
            email: this.jwtHelper.decodeToken(tkn).sub
        };
        this.storageService.setLocalUser(user);
    }

    logout() {
        this.storageService.setLocalUser(null);
    }
}