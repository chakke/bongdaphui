import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-history-budget',
  templateUrl: 'history-budget.html',
})
export class HistoryBudgetPage {

  history: any = [
    {
      type: 'thu1', name: 'name1', monney: 10000
    }, {
      type: 'chi1', name: 'stadium1', monney: 20000
    }, {
      type: 'thu1', name: 'name2', monney: 10000
    }, {
      type: 'chi2', name: 'stadium2', monney: 40000
    }, {
      type: 'chi1', name: 'stadium3', monney: 20000
    },
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryBudgetPage');
  }

}
