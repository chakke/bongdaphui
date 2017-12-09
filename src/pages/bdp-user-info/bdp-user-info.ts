import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BdpModule } from '../../providers/bdp-module';

import { Player } from '../../providers/classes/player';

@IonicPage()
@Component({
  selector: 'page-bdp-user-info',
  templateUrl: 'bdp-user-info.html',
})
export class BdpUserInfoPage {

  mDatas = {
    title: "Thông tin người dùng"
  }

  mPlayer: Player;

  constructor(public navCtrl: NavController,
    public mBdpModule: BdpModule,
     public navParams: NavParams) {
       if(navParams.data['id']){
         console.log(navParams.data['id']);

         this.mPlayer = this.mBdpModule.getPlayerById(navParams.data['id']);
         // get User Info by id
         
       }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BdpUserInfoPage');
  }

}
