import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsPage),
    TranslateModule
  ],
})

export class ProductsPageModule {}
