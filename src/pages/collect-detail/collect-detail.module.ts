import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectDetailPage } from './collect-detail';

@NgModule({
  declarations: [
    CollectDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectDetailPage),
  ],
})
export class CollectDetailPageModule {}
