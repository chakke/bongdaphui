import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-wallet-detail',
  templateUrl: 'wallet-detail.html',
})
export class WalletDetailPage {
  tongQuy: number;
  listMember: any;
  monneyCollect: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    let i = this.navParams.get('walletDetail');
    this.monneyCollect = i.monneyCollect;
    this.listMember = i.members;
    console.log(this.listMember);
    
    this.tongQuy = i.tongQuy;
  }
}
