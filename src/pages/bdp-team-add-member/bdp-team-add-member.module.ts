import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BdpTeamAddMemberPage } from './bdp-team-add-member';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BdpTeamAddMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(BdpTeamAddMemberPage),
    ComponentsModule
  ],
})
export class BdpTeamAddMemberPageModule {}
