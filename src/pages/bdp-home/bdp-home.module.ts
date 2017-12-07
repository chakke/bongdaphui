import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BdpHomePage } from './bdp-home';

@NgModule({
  declarations: [
    BdpHomePage,
  ],
  imports: [
    IonicPageModule.forChild(BdpHomePage),
  ],
})
export class BdpHomePageModule {}
