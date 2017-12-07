import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BdpManageBudgetPage } from './bdp-manage-budget';

@NgModule({
  declarations: [
    BdpManageBudgetPage,
  ],
  imports: [
    IonicPageModule.forChild(BdpManageBudgetPage),
  ],
})
export class BdpManageBudgetPageModule {}
