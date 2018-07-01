import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProductDTO } from "../../models/product.dto";
import { CartItem } from "../../models/cart.item";
import { ProductService } from "./product.service";

@Injectable()

export class CartService {

    constructor(
        public storageService: StorageService,
        public productService: ProductService) {
    }

    createOrClearCart() {
        let cart: Cart = {items: []};
        this.storageService.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storageService.getCart();
        if( cart == null ) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduct(product: ProductDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.product.id == product.id);

        if( position == -1 ) {
            let cartItem: CartItem = {quantity: 1, product: product};
            cart.items.push(cartItem);
        } else {
            cart.items[position].quantity++;
        }

        this.storageService.setCart(cart);

        return cart;
    }

    increaseQuantity(product: ProductDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.product.id == product.id);

        if( position != -1 ) {
            cart.items[position].quantity++;
        }

        this.storageService.setCart(cart);

        return cart;
    }

    removeProduct(product: ProductDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.product.id == product.id);

        if( position != -1 ) {
            cart.items.splice(position, 1);
        }

        this.storageService.setCart(cart);

        return cart;
    }

    decreaseQuantity(product: ProductDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.product.id == product.id);

        if( position != -1 ) {
            if( cart.items[position].quantity > 1 ) {
                cart.items[position].quantity--;
            } else {
                cart.items.splice(position, 1);
            }
        }

        this.storageService.setCart(cart);

        return cart;
    }

}