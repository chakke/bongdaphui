import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BdpModule } from '../../providers/bdp-module';

import { Team } from '../../providers/classes/team';

@IonicPage()
@Component({
  selector: 'page-bdp-team-detail',
  templateUrl: 'bdp-team-detail.html',
})
export class BdpTeamDetailPage {

  team: Team;

  constructor(public navCtrl: NavController,
    public mBdpModule: BdpModule,
    public navParams: NavParams) {
    if (navParams.data['id']) {
      this.team = mBdpModule.getTeamById(navParams.data['id']);
    }
    else{
      this.team = mBdpModule.getTeamById(1);
    }
    console.log(this.team);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BdpTeamDetailPage');
  }

  onClickMember(member) {
    console.log(member);
  }

  onClickAddMember() {
    this.navCtrl.push("BdpTeamAddMemberPage", { id: this.team.id, name: this.team.name });
  }

  onClickStrategy() {
    console.log("onClickStrategy");
    this.navCtrl.push("BdpTeamStrategyPage", { id: this.team.id });
  }
}
