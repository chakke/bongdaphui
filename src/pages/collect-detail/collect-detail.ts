import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { monney } from "../../providers/classes/interface/monney";


@IonicPage()
@Component({
  selector: 'page-collect-detail',
  templateUrl: 'collect-detail.html',
})
export class CollectDetailPage {
  listCollectMonney: monney[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.listCollectMonney = this.navParams.get('collectMonney');
  }

}
