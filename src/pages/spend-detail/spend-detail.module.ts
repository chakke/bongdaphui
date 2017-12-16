import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpendDetailPage } from './spend-detail';

@NgModule({
  declarations: [
    SpendDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SpendDetailPage),
  ],
})
export class SpendDetailPageModule {}
