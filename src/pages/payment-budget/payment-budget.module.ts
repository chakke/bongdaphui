import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentBudgetPage } from './payment-budget';

@NgModule({
  declarations: [
    PaymentBudgetPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentBudgetPage),
  ],
})
export class PaymentBudgetPageModule {}
