import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';

import { Player } from '../../../providers/classes/player';

@IonicPage()
@Component({
  selector: 'page-modal-member-info',
  templateUrl: 'modal-member-info.html',
})
export class ModalMemberInfo {

  mPlayer: Player;
  isFakePlayer = false;

  constructor(public navCtrl: NavController,
    public mViewController: ViewController,
    public mAlertController: AlertController,
    public navParams: NavParams) {
    if (navParams.data['member']) {
      this.mPlayer = navParams.data['member'];
      console.log(this.mPlayer);
      if (this.mPlayer.id.charAt(0) == '-') {
        this.isFakePlayer = true;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalMemberInfoPage');
  }

  onClickClose() {
    console.log("onClickClose");
    this.mViewController.dismiss({ onDetele: false }, "", { animate: false });
    // this.navCtrl.pop();
  }


  onClickView() {
    if (!this.isFakePlayer) {
      this.navCtrl.push("BdpUserInfoPage", { id: this.mPlayer.id });
    }
    else {
      this.navCtrl.push("BdpTeamEditFakePage", { id: this.mPlayer.id });
    }
  }

  onClickDelete() {
    console.log("onClickDelete");
    this.mViewController.dismiss({ onDetele: true }, "", { animate: false });
  }

}
