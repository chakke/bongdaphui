import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Player } from '../../../providers/classes/player';

@IonicPage()
@Component({
  selector: 'page-modal-member-info',
  templateUrl: 'modal-member-info.html',
})
export class ModalMemberInfo {

  mPlayer: Player;

  constructor(public navCtrl: NavController,
    public mAlertController: AlertController,
    public navParams: NavParams) {
    if (navParams.data['member']) {
      this.mPlayer = navParams.data['member'];
      console.log(this.mPlayer);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMemberInfoPage');
  }

  onClickClose() {
    console.log("onClickClose");
    this.navCtrl.pop({ animate: false });
  }


  onClickView() {
    this.navCtrl.push("BdpUserInfoPage", { id: this.mPlayer.id });
  }

  onClickDelete() {
    console.log("onClickDelete");
    this.navCtrl.pop({animate: false});
  }

}
