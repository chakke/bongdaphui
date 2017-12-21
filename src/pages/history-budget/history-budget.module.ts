import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryBudgetPage } from './history-budget';

@NgModule({
  declarations: [
    HistoryBudgetPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryBudgetPage),
  ],
})
export class HistoryBudgetPageModule {}
