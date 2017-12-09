import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';

import { Player } from '../../../providers/classes/player';
import { BdpModule } from '../../../providers/bdp-module';

@IonicPage()
@Component({
  selector: 'page-modal-member-info',
  templateUrl: 'modal-member-info.html',
})
export class ModalMemberInfo {

  mPlayer: Player;
  isFakePlayer = false;
  teamId = -1;

  constructor(public navCtrl: NavController,
    public mViewController: ViewController,
    public mBdpModule: BdpModule,
    public mAlertController: AlertController,
    public navParams: NavParams) {
    if (navParams.data['teamId']) {
      this.teamId = navParams.data['teamId'];

      if (navParams.data['memberId']) {        
        if (navParams.data['memberId'].charAt(0) == '-') {          
          this.mPlayer = this.mBdpModule.getTeamFakeMember(this.teamId, navParams.data['memberId']);
          this.isFakePlayer = true;
        }
        else {
          this.mPlayer = this.mBdpModule.getPlayerById(navParams.data['memberId']);
        }
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
      // this.navCtrl.pop({animate: false}).then(()=>{
      this.navCtrl.push("BdpTeamEditFakePage", { player: this.mPlayer, teamId: this.teamId });
      // })
    }
  }

  onClickDelete() {
    console.log("onClickDelete");
    this.mViewController.dismiss({ onDetele: true }, "", { animate: false });
  }

}
