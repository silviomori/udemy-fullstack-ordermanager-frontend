import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickAddressPage } from './pick-address';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PickAddressPage
  ],
  imports: [
    IonicPageModule.forChild(PickAddressPage),
    TranslateModule
  ],
})

export class PickAddressPageModule {}
