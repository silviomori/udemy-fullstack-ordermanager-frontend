import { Injectable } from "@angular/core";
import { CredentialsDTO } from "../models/credentials.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';
import { CartService } from "./domain/cart.service";

@Injectable()

export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();
    constructor(
        public httpClient: HttpClient,
        public storageService: StorageService,
        public cartService: CartService) {
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

    refreshToken() {
        return this.httpClient.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`,
            {},
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
        this.cartService.createOrClearCart();
    }

    logout() {
        this.storageService.setLocalUser(null);
    }
}