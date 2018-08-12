import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InsertOrderDTO } from '../../models/insert.order.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})

export class PaymentPage {

  insertOrderDTO: InsertOrderDTO;
  installments: number[] = [1,2,3,4,5,6,7,8,9,10];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.insertOrderDTO = this.navParams.get('order');

      this.formGroup = this.formBuilder.group({
        installments: [1, [Validators.required]],
        paymentType: ['TicketPayment', Validators.required]
      });
  }

  nextPage() {
    if( this.insertOrderDTO == null ) {
      this.navCtrl.setRoot('CartPage');
      return;
    }
    this.insertOrderDTO.paymentType = this.formGroup.controls.paymentType.value;
    this.insertOrderDTO.installments = this.formGroup.controls.installments.value;
    this.navCtrl.setRoot("PlaceOrderPage", {order: this.insertOrderDTO});
  }


}
