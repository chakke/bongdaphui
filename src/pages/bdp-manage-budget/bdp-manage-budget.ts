import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

interface itemHistory {
  type: string;
  name: string;
  monney: number
}

interface Sponsor {
  monney: number;
  name: string
}

interface Personer {
  monney: number;
  name: string;
}

interface monneyGiveBack {
  name: string;
  monney: number;
}

interface downPayment {
  nameOfStadium: string;
  monney: number;
  address: string;
  timeBegin: string;
  phoneStadiumOwner: number;
}

interface Payment {
  downPayment: number;
  payment: number
  itemCost: number;
  nameOfStadium: string;
  address: string;
  timeBegin: string;
  phoneStadiumOwner: number;
}

@IonicPage()
@Component({
  selector: 'page-bdp-manage-budget',
  templateUrl: 'bdp-manage-budget.html',
})
export class BdpManageBudgetPage {

  tongQuy: number = 0;
  itemHistoryTest: itemHistory[] = [];
  sponsor: Sponsor[] = [];
  personer: Personer[] = [];
  monneyGiveBack: monneyGiveBack[] = [];

  // [
  //   { type: "thu", name: "BoBo", monney: 50000 },
  //   { type: "thu", name: "LomDom Club", monney: 170000 },
  //   { type: "chi", name: "Sân Tuyệt Vọng", monney: 50000 },
  //   { type: "chi", name: "Sân Cháy", monney: 500000 },
  // ];

  downPayment: downPayment[] = [
    { nameOfStadium: "Sân lớn", monney: 50000, address: "21 Bà Triệu", timeBegin: "8:00pm", phoneStadiumOwner: 11589 },
    { nameOfStadium: "Sân bé", monney: 100000, address: "11 Đại Cồ Việt", timeBegin: "7:00pm", phoneStadiumOwner: 77893 },
    { nameOfStadium: "Sân Chợ Lớn", monney: 75000, address: "31 Cầu Giấy", timeBegin: "6:30pm", phoneStadiumOwner: 223789 },
    { nameOfStadium: "Sân Cháy", monney: 150000, address: "78 Đống Đa", timeBegin: "4:30pm", phoneStadiumOwner: 66683 }
  ];

  payment: Payment[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    // console.log(this.itemHistoryTest);
  }

  /**---Tổng quỹ--- */
  /**Thêm quỹ từ nhà tài trợ */
  addSponsorMonney() {
    let alert = this.alertCtrl.create({
      title: 'Nhà tài trợ',
      inputs: [{
        name: 'nameOfSponsor',
        placeholder: 'Tên nhà tài trợ'
      }, {
        name: 'monney',
        placeholder: 'Số tiền'
      }],
      buttons: [{
        text: 'Hủy'
      }, {
        text: 'Thêm',
        handler: data => {
          let sponsorMonney: number = parseInt(data.monney);
          this.tongQuy = this.tongQuy + sponsorMonney;
          this.sponsor.push({
            name: data.nameOfSponsor,
            monney: data.monney
          });
          this.itemHistoryTest.push({
            name: data.nameOfSponsor,
            type: "Thu",
            monney: sponsorMonney
          });
        }
      }]
    });
    alert.present();
  }
  /**Thêm quỹ từ cá nhân */
  addPersonerMonney() {
    let alert = this.alertCtrl.create({
      title: 'Cá nhân',
      inputs: [{
        name: 'nameOfPersoner',
        placeholder: 'Tên thành viên'
      }, {
        name: 'monney',
        placeholder: 'Số tiền'
      }],
      buttons: [{
        text: 'Hủy'
      }, {
        text: 'Thêm',
        handler: data => {
          let personerMonney: number = parseInt(data.monney);
          this.tongQuy = this.tongQuy + personerMonney;
          this.personer.push({
            name: data.nameOfPersoner,
            monney: personerMonney
          });
          this.itemHistoryTest.push({
            name: data.nameOfSponsor,
            type: "Thu",
            monney: personerMonney
          });
        }
      }]
    });
    alert.present();
  }
  /**Tiền đặt cọc trả lại khi hủy kèo */
  addMoreMonney() {
    let alert = this.alertCtrl.create({
      title: 'Tiền đặt cọc trả lại',
      inputs: [{
        name: 'nameOfStadium',
        placeholder: 'Tên sân bóng'
      }, {
        name: 'monney',
        placeholder: 'Số tiền'
      }],
      buttons: [{
        text: 'Hủy'
      }, {
        text: 'Thêm',
        handler: data => {
          let giveBackMonney: number = parseInt(data.monney);
          this.tongQuy = this.tongQuy + giveBackMonney;
          this.monneyGiveBack.push({
            name: data.nameOfStadium,
            monney: giveBackMonney
          });
          this.itemHistoryTest.push({
            name: data.nameOfStadium,
            type: "Thu",
            monney: giveBackMonney
          });
        }
      }]
    });
    alert.present();
  }

  /**---Lịch thi đấu---*/
  /**Hiển thị thông tin sân đang đặt */
  showDownPayment(item: downPayment) {
    let alert = this.alertCtrl.create({
      title: 'Thông tin sân',
      message: "Tên sân" + item.nameOfStadium + "Đặt cọc" + item.monney + "đ" + "Số đt" + item.phoneStadiumOwner,
      buttons: [{
        text: 'Ok'
      }]
    });
    alert.present();
  }
  /**Đặt thêm sân */
  addDownPayment() {
    let alert = this.alertCtrl.create({
      title: 'Đặt sân',
      inputs: [{
        name: 'nameOfStadium',
        placeholder: 'Tên sân bóng'
      }, {
        name: 'monney',
        placeholder: 'Số tiền đặt cọc'
      }, {
        name: 'address',
        placeholder: 'Địa chỉ'
      }, {
        name: 'timeBegin',
        placeholder: 'Thời gian'
      }, {
        name: 'phoneStadiumOwner',
        placeholder: 'Số đt chủ sân'
      }],
      buttons: [{
        text: 'Hủy'
      }, {
        text: 'Thêm',
        handler: data => {
          this.tongQuy = this.tongQuy - parseInt(data.monney)
          this.downPayment.push(data)
        }
      }]
    });
    alert.present();
  }
  /**Thanh toán*/
  doPaymentItem(item: downPayment, index: number) {
    let alert = this.alertCtrl.create({
      title: 'Thanh toán ' + item.nameOfStadium,
      message: item.phoneStadiumOwner.toString(),
      inputs: [{
        name: 'monney',
        placeholder: 'Tổng tiền thuê sân'
      }, {
        name: 'itemCost',
        placeholder: 'Khoản khác'
      }],
      buttons: [{
        text: 'Hủy'
      }, {
        text: 'Thanh toán',
        handler: data => {
          let alert1 = this.alertCtrl.create({
            message: 'Bạn có chắc muốn thanh toán?',
            buttons: [{
              text: 'Không'
            }, {
              text: 'Có',
              handler: data1 => {
                let payment: number = parseInt(data.monney) + parseInt(data.itemCost);
                this.tongQuy = this.tongQuy - payment;
                this.itemHistoryTest.push({
                  name: item.nameOfStadium,
                  type: 'Chi',
                  monney: payment
                });
                this.downPayment.splice(index, 1);
              }
            }]
          });
          alert1.present();
        }
      }]
    });
    alert.present();
  }
  /**Hủy đặt sân */
  deletePaymentItem(item: any) {
    let alert = this.alertCtrl.create({
      message: 'Bạn có chắc muốn hủy đặt sân',
      buttons: [{
        text: 'Không'
      }, {
        text: 'Có',
        handler: () => {
          this.downPayment.splice(item, 1)
        }
      }]
    });
    alert.present();
  }
}
