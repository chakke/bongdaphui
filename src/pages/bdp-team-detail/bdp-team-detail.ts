import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { BdpModule } from '../../providers/bdp-module';

import { Team } from '../../providers/classes/team';
import { Player } from '../../providers/classes/player';

@IonicPage()
@Component({
  selector: 'page-bdp-team-detail',
  templateUrl: 'bdp-team-detail.html',
})
export class BdpTeamDetailPage {

  team: Team;

  constructor(public navCtrl: NavController,
    public mBdpModule: BdpModule,
    public mAlertController: AlertController,
    public mModalController: ModalController,
    public navParams: NavParams) {
    if (navParams.data['id']) {
      this.team = mBdpModule.getTeamById(navParams.data['id']);
    }
    else {
      this.team = mBdpModule.getTeamById(1);
    }
    console.log(this.team);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BdpTeamDetailPage');
  }

  onClickMember(member: Player) {
    console.log(member);
    let modal = this.mModalController.create("ModalMemberInfo", { member: member });

    modal.onWillDismiss(() => {
      this.confirmDelete(member);
    });

    modal.present({ animate: false });
  }

  onClickAddMember() {
    this.navCtrl.push("BdpTeamAddMemberPage", { id: this.team.id, name: this.team.name });
  }

  onClickStrategy() {
    console.log("onClickStrategy");
    this.navCtrl.push("BdpTeamStrategyPage", { id: this.team.id });
  }

  onClickDelete(member: Player) {
    console.log("delete", member);
    this.confirmDelete(member)
  }

  confirmDelete(member: Player) {
    let alert = this.mAlertController.create({
      title: 'Xác nhận',
      message: "Bạn muốn xóa <span class='n-bold-text'>" + member.name + "</span> khỏi đội?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Xóa',
          handler: () => {
            this.deleteMember(member);
          }
        }
      ]
    });

    alert.present();
  }

  deleteMember(member: Player) {
    this.mBdpModule.deleteTeamMember(this.team.id, member);
  }
}
