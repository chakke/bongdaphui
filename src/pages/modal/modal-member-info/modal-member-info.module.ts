import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalMemberInfo } from './modal-member-info';

@NgModule({
  declarations: [
    ModalMemberInfo,
  ],
  imports: [
    IonicPageModule.forChild(ModalMemberInfo),
  ],
})
export class ModalMemberInfoModule {}
