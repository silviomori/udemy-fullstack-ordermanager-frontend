import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { StateService } from '../../services/domain/state.service';
import { CityService } from '../../services/domain/city.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    TranslateModule
  ],
  providers: [
    StateService,
    CityService
  ]
})

export class SignupPageModule {}
