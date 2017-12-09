import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BdpModule } from '../../providers/bdp-module';
import { Player } from '../../providers/classes/player';

@IonicPage()
@Component({
  selector: 'page-bdp-team-edit-fake',
  templateUrl: 'bdp-team-edit-fake.html',
})
export class BdpTeamEditFakePage {

  mDatas = {
    title: "Sửa thông tin",
    playerInfo: {
      name: "Tên",
      phone: "Số điện thoại",
      email: "Email",
      shirtNumber: "Số áo",
      avatar: "Ảnh đại diện"
    },
    teamId: -1,
    teamName: ""
  }

  mPlayer = new Player();
  resultPlayer: Player = null;

  constructor(public navCtrl: NavController,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BdpTeamEditFakePage');
  }

}
