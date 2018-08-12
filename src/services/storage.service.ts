import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { Cart } from "../models/cart";

@Injectable()

export class StorageService {

    constructor() {
    }

    getLocalUser() : LocalUser {
        let user = localStorage.getItem( STORAGE_KEYS.localUser );
        if( user == null ) {
            return null;
        } else {
            return JSON.parse( user );
        }
    }

    setLocalUser(localUser: LocalUser) {
        if( localUser == null ) {
            localStorage.removeItem( STORAGE_KEYS.localUser );
        } else {
            localStorage.setItem( STORAGE_KEYS.localUser, JSON.stringify( localUser ) );
        }
    }

    getCart() : Cart {
        let cart = localStorage.getItem( STORAGE_KEYS.cart );
        if( cart == null ) {
            return null;
        } else {
            return JSON.parse( cart );
        }
    }

    setCart(cart: Cart) {
        if( cart == null ) {
            localStorage.removeItem( STORAGE_KEYS.cart );
        } else {
            localStorage.setItem( STORAGE_KEYS.cart, JSON.stringify( cart ) );
        }
    }

    getLanguage() : string {
        return localStorage.getItem( STORAGE_KEYS.lang );
    }

    setLanguage(lang: string) {
        if( lang == null ) {
            localStorage.removeItem( STORAGE_KEYS.lang );
        } else {
            localStorage.setItem( STORAGE_KEYS.lang, lang);
        }
    }

    getCurrency() : string {
        return localStorage.getItem( STORAGE_KEYS.currency );
    }

    setCurrency(currency: string) {
        if( currency == null ) {
            localStorage.removeItem( STORAGE_KEYS.currency );
        } else {
            localStorage.setItem( STORAGE_KEYS.currency, currency);
        }
    }

}