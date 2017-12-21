import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookBudgetPage } from './book-budget';

@NgModule({
  declarations: [
    BookBudgetPage,
  ],
  imports: [
    IonicPageModule.forChild(BookBudgetPage),
  ],
})
export class BookBudgetPageModule {}
