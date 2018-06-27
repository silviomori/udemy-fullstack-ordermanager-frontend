import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService) {
    }

    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        return handler.handle(request)
        .catch((error, caught) => {

            let errorObj = error;
            if( errorObj.error ) {
                errorObj = errorObj.error;
            }

            if( !errorObj.status ) { // It is not a JSon format object
                errorObj = JSON.parse( errorObj );
            }

            switch(errorObj.status) {
                case 403:
                    this.handle403();
                    break;  
            }

            return Observable.throw(errorObj);
        }) as any;
    }


    private handle403() {
        this.storageService.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};