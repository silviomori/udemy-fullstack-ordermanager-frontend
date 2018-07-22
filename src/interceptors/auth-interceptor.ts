import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService) {
    }

    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storageService.getLocalUser();

        if(localUser && request.url.startsWith(API_CONFIG.baseUrl)) {
            const authRequest = request.clone({headers: request.headers.set('Authorization', 'Bearer '+localUser.token)});
            return handler.handle(authRequest);
        }

        return handler.handle(request);

    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};