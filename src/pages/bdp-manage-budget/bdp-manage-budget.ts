import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { FirebaseServiceProvider } from "../../providers/classes/firebase-service/firebase-service";
import { Observable } from 'rxjs/Observable';
import { Stadium, StadiumInterface } from "../../providers/classes/interface/stadium";
import { BdpModule } from "../../providers/bdp-module";

import { monney } from "../../providers/classes/interface/monney";

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";

interface downPayment {
  nameOfStadium: string;
  monney: number;
  address: string;
  timeBegin: string;
  phoneStadiumOwner: number;
}

interface Member {
  id: string;
  name: string;
  email: string;
  wallet: number;
}
interface Wallet {
  name: string;
  monneyPerMan: number;
  allMonney: number;
}



@IonicPage()
@Component({
  selector: 'page-bdp-manage-budget',
  templateUrl: 'bdp-manage-budget.html',
})
export class BdpManageBudgetPage {

  tongQuy: number = 0;
  monneyCollect: number = 50000;
  collectMonney: monney[] = [
    // {
    //   name: "a",
    //   monney: 50000
    // }, {
    //   name: "b",
    //   monney: 1000
    // }, {
    //   name: "c",
    //   monney: 1000
    // }, {
    //   name: "d",
    //   monney: 1000
    // }
  ];
  spendMonney: monney[] = [
    // {
    //   name: "a",
    //   monney: 1000
    // },
    // {
    //   name: "b",
    //   monney: 100000
    // }, {
    //   name: "c",
    //   monney: 1000
    // }, {
    //   name: "d",
    //   monney: 1000
    // }
  ];
  walletMonney: any[];







  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public firebaseService: FirebaseServiceProvider,
    public mBdpModule: BdpModule,
    public af: AngularFirestore
  ) {
  }



  /**---Tổng quỹ--- */

  /**Thu quỹ */
  goCollectPage() {
    this.navCtrl.push("WalletDetailPage", {
      walletDetail: {
        tongQuy: this.tongQuy,
        monneyCollect: this.monneyCollect,
        members: this.mBdpModule.getTeams()[0].members
      }
    });
  }
  /**Đặt sân */
  goBookPage() {
    this.navCtrl.push("BookBudgetPage");
  }
  /**Thanh toán */
  goPaymentPage() {
    this.navCtrl.push("PaymentBudgetPage");

  }
  /**Lịch sử */
  goHistoryPage() {
    this.navCtrl.push("HistoryBudgetPage");

  }
  /**Chi tiết thu */
  collectDetail() {
    this.navCtrl.push("CollectDetailPage", { collectMonney: this.collectMonney })
  }
  /**Chi tiết chi */
  spendDetail() {
    this.navCtrl.push("SpendDetailPage", { spendMonney: this.spendMonney })
  }
  /**Chi tiết quỹ */
  walletDetail() {
    this.navCtrl.push("WalletDetailPage", {
      walletDetail: {
        tongQuy: this.tongQuy,
        monneyCollect: this.monneyCollect,
        members: this.mBdpModule.getTeams()[0].members
      }
    });
  }

  addMember() {
    let alert = this.alertCtrl.create({
      title: 'Add item',
      message: 'Fill infomation to add item',
      inputs: [{
        name: 'name',
        placeholder: 'ten thang'
      }, {
        type: 'number',
        name: 'monneyPerMan',
        placeholder: 'moi thanh vien'
      }],
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Add',
        handler: data => {
          this.addItem(data);
        }
      }]
    });
    alert.present()
  }
  addItem(item: Wallet) {
    let name = item.name;
    let monneyPerMan = item.monneyPerMan;
    let allMonney = 500000;
    this.af.collection('walletDec2017').add({ name, monneyPerMan, allMonney }).then(newItem => {
      console.log(`Add new item: "${item.name}"`);
    }).catch(err => {
      console.log(err);
    })
  }

  test() {
    let a = this.af.collection('walletDec2017', ref => ref.orderBy('name'));
    a.snapshotChanges().subscribe(list => {
      let i = list.map(data => {
        // console.log(data.payload.doc.data());
        // console.log(data.payload.doc);        
      })

    });

    let i = this.af.doc("walletDec2017/Jn8lcZxk2rDAXyjBmPjF");
    i.valueChanges().subscribe((data)=>{
      console.log("Value changes",data);
      
    });

    i.snapshotChanges().subscribe(snapshot=>{
      console.log("snapshot changed ", snapshot.payload.data());
      
    });
    // i.
    // i.snapshotChanges().subscribe(data =>{
    //   console.log(data);
      
    //   // let ii = data.map(data =>{
    //     // console.log(data.payload.doc.data());
        
    //   // })
      
    // })
    
  }

}
