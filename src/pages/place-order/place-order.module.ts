import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceOrderPage } from './place-order';
import { OrderService } from '../../services/domain/order.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PlaceOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceOrderPage),
    TranslateModule
  ],
  providers: [
    OrderService
  ]
})

export class PlaceOrderPageModule {}
