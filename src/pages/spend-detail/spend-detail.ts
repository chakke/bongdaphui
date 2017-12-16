import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { monney } from "../../providers/classes/interface/monney";


@IonicPage()
@Component({
  selector: 'page-spend-detail',
  templateUrl: 'spend-detail.html',
})
export class SpendDetailPage {
  listSpendMonney : monney [] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.listSpendMonney = this.navParams.get('spendMonney');
  }

}
