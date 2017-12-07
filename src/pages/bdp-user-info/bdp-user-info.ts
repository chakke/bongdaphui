import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-bdp-user-info',
  templateUrl: 'bdp-user-info.html',
})
export class BdpUserInfoPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams) {
       if(navParams.data['id']){
         console.log(navParams.data['id']);

         // get User Info by id
         
       }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BdpUserInfoPage');
  }

}
