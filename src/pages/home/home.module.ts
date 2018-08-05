import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [HomePage],
    imports: [
        IonicPageModule.forChild(HomePage),
        TranslateModule
    ]
})

export class HomeModule {}