import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService, public alertCtrl: AlertController) {
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
                case 401:
                    this.handle401();
                    break;  
                case 403:
                    this.handle403();
                    break;
                    
                default:
                    this.handleDefaultError(errorObj);
                    break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    private handle401() {
        let alert = this.alertCtrl.create({
            title: '401 Error: Authentication Fail',
            message: 'Email / password invalid',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }

    private handle403() {
        this.storageService.setLocalUser(null);
    }

    private handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title: errorObj.status + ' Error: '+ errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};