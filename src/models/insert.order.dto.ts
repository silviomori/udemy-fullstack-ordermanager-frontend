import { OrderItemDTO } from "./order.item.dto";

export interface InsertOrderDTO {
    customerId: string;
    customerAddressId: string;
    paymentType: string;
    installments: number;
    orderItems: OrderItemDTO[];
}