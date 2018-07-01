import { ProductDTO } from "./product.dto";

export interface CartItem {
    
    product: ProductDTO;
    quantity: number;

}