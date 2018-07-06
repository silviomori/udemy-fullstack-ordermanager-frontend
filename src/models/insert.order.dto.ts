import { RefDTO } from "./ref.dto";
import { PaymentDTO } from "./payment.dto";
import { OrderItemDTO } from "./order.item.dto";

export interface InsertOrderDTO {
    customerId: RefDTO;
    customerAddressId: RefDTO;
    payment: PaymentDTO;
    orderItems: OrderItemDTO[];
}