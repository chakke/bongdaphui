import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

interface historyBudget {
  title: string;
  type: string;
  date: string;
  monney: number;
}

@IonicPage()
@Component({
  selector: 'page-payment-budget',
  templateUrl: 'payment-budget.html',
})
export class PaymentBudgetPage {
  downPayment: any[] = [
    { nameOfStadium: "Sân lớn", monney: 50000, monneyAll: 100000, address: "21 Bà Triệu", timeBegin: "8:00pm", phoneStadiumOwner: 11589 },
    { nameOfStadium: "Sân bé", monney: 100000, monneyAll: 200000, address: "11 Đại Cồ Việt", timeBegin: "7:00pm", phoneStadiumOwner: 77893 },
    { nameOfStadium: "Sân Chợ Lớn", monney: 75000, monneyAll: 150000, address: "31 Cầu Giấy", timeBegin: "6:30pm", phoneStadiumOwner: 223789 },
    { nameOfStadium: "Sân Cháy", monney: 150000, monneyAll: 300000, address: "78 Đống Đa", timeBegin: "4:30pm", phoneStadiumOwner: 66683 }
  ];
  tongQuy: number;
  historyBudget: historyBudget[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {

  }

  /**Hiển thị thông tin sân đang đặt */
  showDownPayment(item: any, index: number) {
    let alert = this.alertCtrl.create({
      title: 'Thông tin sân',
      message:
        "Tên sân:" + '&emsp;' + item.nameOfStadium + '<br>' +
        "Đặt cọc:" + '&emsp;' + item.monney + "đ" + '<br>' +
        "Tiền sân:" + '&emsp;' + item.monneyAll + "đ" + '<br>' +
        "Số đt:" + '&emsp;&emsp;' + item.phoneStadiumOwner + '<br>' +
        "Địa chỉ:" + '&emsp;' + item.address,
      inputs: [{
        type: "number",
        name: "monneyOther",
        placeholder: "Tiền khác"
      }],
      buttons: [{
        text: 'Hủy'
      }, {
        text: 'Thanh toán',
        handler: data => {
          let otherMonney: number;
          let allMonney: number;
          if (data.monneyOther == "") otherMonney = 0;
          else otherMonney = parseInt(data.monneyOther);
          allMonney = parseInt(item.monneyAll) + otherMonney;
          let confirmPayment = this.alertCtrl.create();
          confirmPayment.setMessage("Thanh toán " + String(allMonney) + "đ cho sân " + item.nameOfStadium + "?");
          confirmPayment.addButton("Hủy");
          confirmPayment.addButton({
            text: 'Ok',
            handler: () => {
              let payment: number = parseInt(data.monney) + parseInt(data.itemCost);
              this.tongQuy = this.tongQuy - payment;
              this.historyBudget.push({
                title: 'Chi' + allMonney + 'đ để trả tiền sân ' + data.name+data.id,
                type: 'chi',
                date: String(new Date().getTime()),
                monney: data.monney
              });
              this.downPayment.splice(index, 1);
            }
          });
          confirmPayment.present();
        }
      }]
    });
    alert.present();
  }

}
