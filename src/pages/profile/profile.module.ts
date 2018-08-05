import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { Camera } from '@ionic-native/camera'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    TranslateModule
  ],
  providers: [
    Camera
  ]
})

export class ProfilePageModule {}
