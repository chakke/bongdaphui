import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BdpModule } from '../../providers/bdp-module';

import { TeamOverview } from '../../providers/classes/team';

@IonicPage()
@Component({
  selector: 'page-bdp-manage-team',
  templateUrl: 'bdp-manage-team.html',
})
export class BdpManageTeamPage {

  teams: Array<TeamOverview> = [];

  constructor(public navCtrl: NavController,
    public mBdpModule: BdpModule,
    public navParams: NavParams) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BdpManageTeamPage');
  }

  getData() {
    let ts = this.mBdpModule.getTeams();

    ts.forEach(t => {
      let team = new TeamOverview();
      team.onResponseData(t);
      this.teams.push(team);
    })
  }

  onClickTeam(team: TeamOverview) {
    console.log(team);

    this.navCtrl.push("BdpTeamDetailPage", { id: team.id });
  }

}
