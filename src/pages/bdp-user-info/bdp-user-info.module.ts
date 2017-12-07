import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BdpUserInfoPage } from './bdp-user-info';

@NgModule({
  declarations: [
    BdpUserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BdpUserInfoPage),
  ],
})
export class BdpUserInfoPageModule {}
