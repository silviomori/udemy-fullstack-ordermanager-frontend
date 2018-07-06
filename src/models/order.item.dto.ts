import { RefDTO } from "./ref.dto";

export interface OrderItemDTO {
    productId: RefDTO;
    quantity: number;
}