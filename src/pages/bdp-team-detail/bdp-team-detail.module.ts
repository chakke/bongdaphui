import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BdpTeamDetailPage } from './bdp-team-detail';


@NgModule({
  declarations: [
    BdpTeamDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BdpTeamDetailPage),
  ],
})
export class BdpTeamDetailPageModule {}
