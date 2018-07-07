import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceOrderPage } from './place-order';
import { OrderService } from '../../services/domain/order.service';

@NgModule({
  declarations: [
    PlaceOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceOrderPage),
  ],
  providers: [
    OrderService
  ]
})

export class PlaceOrderPageModule {}
