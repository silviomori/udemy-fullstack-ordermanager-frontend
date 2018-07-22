
import {throwError as observableThrowError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';
import { FieldMessage } from '../models/fieldmessage';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService, public alertCtrl: AlertController) {
    }

    intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        return handler.handle(request).pipe(
        catchError((error, caught) => {

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
                case 422:
                    this.handle422(errorObj);
                    break;
                    
                default:
                    this.handleDefaultError(errorObj);
                    break;
            }

            return observableThrowError(errorObj);
        })) as any;
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

    private handle422(errorObj) {
        let alert = this.alertCtrl.create(
            {
                title: "Validation error",
                message: this.listErrors(errorObj.fieldMessages),
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'OK'
                    }
                ]
            }
        );
        alert.present();
    }

    private listErrors(messages: FieldMessage[]): string {
        let message: string = '';
        for( var i=0; i < messages.length; i++ ) {
            message = message + 
                '<p>'+
                    '<strong>' + messages[i].fieldName + '</strong>: ' +
                    messages[i].message +
                '</p>'
        }
        return message;
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