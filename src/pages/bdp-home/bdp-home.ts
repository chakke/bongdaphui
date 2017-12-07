import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bdp-home',
  templateUrl: 'bdp-home.html',
})
export class BdpHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BdpHomePage');
  }

  onClickManageTeam(){
    this.navCtrl.push("BdpManageTeamPage");
  }

  onClickManageBudget(){
    this.navCtrl.push("BdpManageBudgetPage");

  }
}
