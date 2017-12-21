import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { member } from "../../providers/classes/interface/member";

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";


interface historyBudget {
  title: string;
  type: string;
  date: string;
  monney: number;
}

interface quyThang {
  time: string;
  monney: number;
  monneyPerMan: number;
}

@IonicPage()
@Component({
  selector: 'page-wallet-detail',
  templateUrl: 'wallet-detail.html',
})
export class WalletDetailPage {
  tongQuy: number;
  listMember: any;
  monneyQuyThang: number;
  historyBudget: historyBudget[] = [];
  listQuyThang: any;
  quyThang: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public af: AngularFirestore
  ) {
  }

  ionViewDidLoad() {
    this.showListMember();
    this.getQuyThangs();
    // let i = this.navParams.get('walletDetail');
    // this.listMember = [];
    // i.members.forEach(item => {
    // let i = new member();
    // i.getMember(item);
    // this.listMember.push(i);
    // });

    // this.tongQuy = i.tongQuy;
    // this.quyThang = this.listQuyThang[0];

  }
  /**Nộp quỹ */
  addMonney() {
    let alertMonney = this.alertCtrl.create();
    alertMonney.setTitle('Thu quỹ');
    alertMonney.addInput({
      type: 'radio',
      label: '10000đ',
      value: '10000',
      checked: true
    });
    alertMonney.addInput({
      type: 'radio',
      label: '20000đ',
      value: '20000',
      // checked: this.checked(20000)
    });
    alertMonney.addInput({
      type: 'radio',
      label: '50000đ',
      value: '50000',
      // checked: this.checked(50000)
    });
    alertMonney.addInput({
      type: 'radio',
      label: '100000đ',
      value: '100000',
      // checked: this.checked(100000)
    });
    alertMonney.addInput({
      type: 'radio',
      label: 'Nhập số khác',
      value: 'other',
    });
    alertMonney.addButton('Hủy');
    alertMonney.addButton({
      text: 'Ok',
      handler: data => {
        if (data == "other") {
          let otherMonneyAlert = this.alertCtrl.create();
          otherMonneyAlert.setTitle('Nhập số khác');
          otherMonneyAlert.addInput({
            type: 'number',
            name: 'otherMonney',
            placeholder: 'Nhập số tiền'
          });
          otherMonneyAlert.addButton('Hủy');
          otherMonneyAlert.addButton({
            text: 'Ok',
            handler: otherMonney => {
              let alertConfirm = this.alertCtrl.create();
              alertConfirm.setMessage('Thu' + otherMonney.otherMonney + 'đ từ các thành viên?');
              alertConfirm.addButton('Hủy');
              alertConfirm.addButton({
                text: 'Ok',
                handler: () => {
                  // this.monneyCollect = parseInt(otherMonney.otherMonney);
                }
              });
              alertConfirm.present();
            }
          });
          otherMonneyAlert.present();
        } else {
          let alertConfirm = this.alertCtrl.create();
          alertConfirm.setMessage('Thu' + data + 'đ từ các thành viên?');
          alertConfirm.addButton('Hủy');
          alertConfirm.addButton({
            text: 'Ok',
            handler: () => {
              // this.monneyCollect = parseInt(data);
            }
          });
          alertConfirm.present();
        }
      }
    });
    alertMonney.present();
  }

  /**Nộp quỹ mỗi thành viên */
  clickMemberAddMonney(item: any) {
    let alertMember = this.alertCtrl.create();
    alertMember.setTitle(item.name + item.id);
    alertMember.addInput({
      type: 'radio',
      label: '10,000đ',
      value: '10000'
    });
    alertMember.addInput({
      type: 'radio',
      label: '20,000đ',
      value: '20000'
    });
    alertMember.addInput({
      type: 'radio',
      label: '50,000đ',
      value: '50000'
    });
    alertMember.addInput({
      type: 'radio',
      label: '100,000đ',
      value: '100000'
    });
    alertMember.addButton('Hủy');
    alertMember.addButton({
      text: 'Ok',
      handler: monney => {
        let personerMonney: number = parseInt(monney);
        this.tongQuy = this.tongQuy + personerMonney;
        item.monney = item.monney + personerMonney;
        this.listMember.splice(0, 1);
        this.listMember.splice(0, 0, item);
        this.historyBudget.push({
          title: 'Thu' + monney + 'đ của ' + item.name + item.id,
          type: 'thu',
          date: String(new Date().getTime()),
          monney: item.monney
        });
      }
    })
    alertMember.present();
  }

  showListMember() {
    let listMember = this.af.collection("member", ref => ref.orderBy("name"));
    listMember.snapshotChanges().subscribe(data => {
      this.listMember = data.map(item => {
        return {
          name: item.payload.doc.data().name,
          monney: item.payload.doc.data().wallet,
          id: item.payload.doc.id
        }
      })
    })
  }

  /**Hiển thị tất cả các quỹ tháng */
  getQuyThangs() {
    let quyThang = this.af.collection("wallet", ref => ref.orderBy("time"));
    quyThang.snapshotChanges().subscribe(data => {
      this.listQuyThang = data.map(item => {
        return {
          time: item.payload.doc.data().time,
          monney: item.payload.doc.data().monney,
          monneyPerMan: item.payload.doc.data().monneyPerMan,
          id: item.payload.doc.id
        }
      });
      let month = String(new Date().getMonth() + 1) + "-" + String(new Date().getFullYear());
      this.listQuyThang.forEach(item => {
        if (month == item.time) {
          this.quyThang = this.listQuyThang[0];
        }
      })
    })
  }
  /**Hiện thị thông tin quỹ tháng được chọn */
  quyThangDetail() {

    console.log(this.quyThang)

  }

  /**Lấy tháng */
  getMonth(number: number): string {
    let month = new Date().getMonth() + 1 + number;
    let year = new Date().getFullYear();
    if (month == 0) {
      month = 12;
      year = year - 1;
    } else if (month == 13) {
      month = 1;
      year = year + 1;
    }
    return String(month) + "-" + String(year);

  }
  /**Chọn tháng */
  addMonth() {
    let addMonth = this.alertCtrl.create();
    addMonth.setTitle("Chọn tháng")
    addMonth.addInput({
      type: "radio",
      label: this.getMonth(-1),
      value: this.getMonth(-1)
    }); addMonth.addInput({
      type: "radio",
      label: this.getMonth(0),
      value: this.getMonth(0),
      checked: true
    }); addMonth.addInput({
      type: "radio",
      label: this.getMonth(1),
      value: this.getMonth(1)
    });
    addMonth.addButton("Hủy");
    addMonth.addButton({
      text: "Ok",
      handler: date => {
        this.monneyPerManForMonth(date)
      }
    })
    addMonth.present();
  }

  /**Chọn mỗi người nộp bao nhiêu tiền quỹ */
  monneyPerManForMonth(date) {
    let alertMonney = this.alertCtrl.create();
    alertMonney.setTitle('Thu quỹ');
    alertMonney.addInput({
      type: 'radio',
      label: '10,000đ/người',
      value: '10000',
      checked: true
    });
    alertMonney.addInput({
      type: 'radio',
      label: '20,000đ/người',
      value: '20000',
    });
    alertMonney.addInput({
      type: 'radio',
      label: '50,000đ/người',
      value: '50000',
    });
    alertMonney.addInput({
      type: 'radio',
      label: '100,000đ/người',
      value: '100000',
    });
    alertMonney.addInput({
      type: 'radio',
      label: 'Nhập số khác',
      value: 'other',
    });
    alertMonney.addButton('Hủy');
    alertMonney.addButton({
      text: 'Ok',
      handler: monney => {
        if (monney == "other") {
          this.monneyOtherPerManForMonth("add", date);
        } else {
          this.confirmAlert("add", date, monney)
        }
      }
    });
    alertMonney.present();
  }
  /**Nếu chọn khoản khác thì điền số tiền khác */
  monneyOtherPerManForMonth(type: string, date) {
    let otherMonneyAlert = this.alertCtrl.create();
    otherMonneyAlert.setTitle('Nhập số khác');
    otherMonneyAlert.addInput({
      type: 'number',
      name: 'monney',
      placeholder: 'Nhập số tiền'
    });
    otherMonneyAlert.addButton('Hủy');
    otherMonneyAlert.addButton({
      text: 'Ok',
      handler: otherMonney => {
        this.confirmAlert(type, date, otherMonney.monney)
      }
    });
    otherMonneyAlert.present();
  }
  /**Alert xác nhận chọn */
  confirmAlert(type: string, time, monney) {
    let alertConfirm = this.alertCtrl.create();
    alertConfirm.setMessage('Thu quỹ tháng ' + time + ' với mỗi thành viên ' + monney + 'đ ?');
    alertConfirm.addButton('Hủy');
    alertConfirm.addButton({
      text: 'Ok',
      handler: () => {
        if (type == "add") {
          this.addWalletToData(time, monney);
        } else if (type == "edit") {
          this.editWalletToData(time, monney)
        }
      }
    });
    alertConfirm.present();
  }
  /**Thêm quỹ lên firebase */
  addWalletToData(time, monneyPM) {
    let monney = 10 * monneyPM;
    let monneyPerMan = parseInt(monneyPM)
    console.log(time, monney, monneyPerMan);

    this.af.collection('wallet').add({ time, monney, monneyPerMan }).then(newItem => {
      console.log("add" + time);
    }).catch(err => console.log(err));
  }
  /**Sửa quỹ trên firebase */
  editWalletToData(time, monneyPerMan) {
    let monney = 10* monneyPerMan;
    let ref = this.af.doc(`wallet/${this.quyThang.id}`).ref;
    let batch = this.af.firestore.batch();
    batch.update(ref, {
      time: time,
      monney: monney,
      monneyPerMan: monneyPerMan
    });
    batch.commit()
      .then(() => {
        console.log('edited');
      })
      .catch(err => {
        console.log('error');
      });
  }
  /**Sửa quỹ  */
  editQuyThang() {
    let alertMonney = this.alertCtrl.create();
    alertMonney.setTitle('Sửa quỹ tháng ' + this.quyThang.time);
    alertMonney.addInput({
      type: 'radio',
      label: '10,000đ/người',
      value: '10000',
      checked: this.checked(10000)
    });
    alertMonney.addInput({
      type: 'radio',
      label: '20,000đ/người',
      value: '20000',
      checked: this.checked(20000)
    });
    alertMonney.addInput({
      type: 'radio',
      label: '50,000đ/người',
      value: '50000',
      checked: this.checked(50000)
    });
    alertMonney.addInput({
      type: 'radio',
      label: '100,000đ/người',
      value: '100000',
      checked: this.checked(100000)
    });
    alertMonney.addInput({
      type: 'radio',
      label: 'Nhập số khác',
      value: 'other',
    });
    alertMonney.addButton('Hủy');
    alertMonney.addButton({
      text: 'Ok',
      handler: monney => {
        if (monney == "other") {
          this.monneyOtherPerManForMonth("edit", this.quyThang.time);
        } else {
          this.confirmAlert("edit", this.quyThang.time, monney);
        }
      }
    });
    alertMonney.present();
  }
  checked(number: number): boolean {
    let checked: boolean;
    if (number == this.monneyQuyThang) {
      checked = true;
    } else {
      checked = false;
    }
    return checked;
  }
  /**Back to BudgetPage */
  doBackBudgetPage() {
    this.navCtrl.pop();
  }
}
