import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BdpManageTeamPage } from './bdp-manage-team';

@NgModule({
  declarations: [
    BdpManageTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(BdpManageTeamPage),
  ],
})
export class BdpManageTeamPageModule {}
