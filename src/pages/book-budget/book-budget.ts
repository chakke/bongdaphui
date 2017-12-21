import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { FirebaseServiceProvider } from "../../providers/classes/firebase-service/firebase-service";

interface historyBudget {
  title: string;
  type: string;
  date: string;
  monney: number;
}

@IonicPage()
@Component({
  selector: 'page-book-budget',
  templateUrl: 'book-budget.html',
})
export class BookBudgetPage {
  downPayment: any[] = [
    { nameOfStadium: "Sân lớn", monney: 50000, address: "21 Bà Triệu", timeBegin: "8:00pm", phoneStadiumOwner: 11589 },
    { nameOfStadium: "Sân bé", monney: 100000, address: "11 Đại Cồ Việt", timeBegin: "7:00pm", phoneStadiumOwner: 77893 },
    { nameOfStadium: "Sân Chợ Lớn", monney: 75000, address: "31 Cầu Giấy", timeBegin: "6:30pm", phoneStadiumOwner: 223789 },
    { nameOfStadium: "Sân Cháy", monney: 150000, address: "78 Đống Đa", timeBegin: "4:30pm", phoneStadiumOwner: 66683 }
  ];
  tongQuy: number = 0;
  historyBudget: historyBudget[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public firebaseService: FirebaseServiceProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookBudgetPage');
  }
  /**Hiển thị thông tin sân đang đặt */
  showDownPayment(item: any, index: number) {
    let alert = this.alertCtrl.create({
      title: 'Thông tin sân',
      message:
        "Tên sân:" + '&emsp;' + item.nameOfStadium + '<br>' +
        "Đặt cọc:" + '&emsp;' + item.monney + "đ" + '<br>' +
        "Số đt:" + '&emsp;&emsp;' + item.phoneStadiumOwner + '<br>' +
        "Địa chỉ:" + '&emsp;' + item.address,
      buttons: [{
        text: 'Ok'
      }, {
        text: 'Hủy đặt sân',
        handler: () => {
          let cancelPayment = this.alertCtrl.create({
            message: 'Bạn có chắc muốn hủy đặt sân',
            buttons: [{
              text: 'Không'
            }, {
              text: 'Có',
              handler: () => {
                this.tongQuy = this.tongQuy + item.monney;
                this.historyBudget.push({
                  title: 'Nhận lại ' + item.monney + 'đ do hủy đặt sân ' + item.nameOfStadium,
                  type: 'thu',
                  date: String(new Date().getTime()),
                  monney: item.monney
                });
                this.downPayment.splice(index, 1);                
              }
            }]
          });
          cancelPayment.present();
        }
      }]
    });
    alert.present();
  }
  /**Đặt thêm sân */
  addDownPayment() {
    this.firebaseService.getStaduim().subscribe(data => {
      let listStatium = data.items;
      let alert = this.alertCtrl.create();
      alert.setTitle('Danh sách sân bóng');
      listStatium.forEach(element => {
        alert.addInput({
          type: 'radio',
          label: element.nameStadium,
          value: element
        });
      });
      alert.addButton('Hủy');
      alert.addButton({
        text: 'Ok',
        handler: data => {
          let alertConfirm = this.alertCtrl.create();
          alertConfirm.setTitle('Đặt cọc');
          alertConfirm.setMessage(
            'Tên sân:' + '&emsp;' + data.nameOfStadium + '<br>' +
            'Số đt:' + '&emsp;&emsp;' + data.phone + '<br>' +
            'Địa chỉ:' + '&emsp;' + data.address + '<br>' +
            'Thời gian:' + '&emsp;' + data.timeBegin);
          alertConfirm.addInput({
            type: 'number',
            name: 'monney',
            placeholder: 'Số tiền đặt cọc'
          });
          alertConfirm.addButton('Hủy');
          alertConfirm.addButton({
            text: 'Ok',
            handler: dataConfirm => {
              let alert1 = this.alertCtrl.create();
              alert1.setMessage("Bạn có chắc muốn đặt sân?");
              alert1.addButton('Không');
              alert1.addButton({
                text: 'Có',
                handler: () => {
                  let monney = parseInt(dataConfirm.monney)
                  this.tongQuy = this.tongQuy - monney;
                  this.downPayment.push({
                    nameOfStadium: data.nameStadium,
                    monney: monney,
                    address: data.address,
                    timeBegin: data.timeBegin,
                    phoneStadiumOwner: data.phone
                  });
                  this.historyBudget.push({
                    title: 'Chi' + monney + 'đ để đặt sân ' + data.nameOfStadium,
                    type: 'chi',
                    date: String(new Date().getTime()),
                    monney: data.monney
                  });
                }
              });
              alert1.present();
            }
          })
          alertConfirm.present();
        }
      })
      alert.present();
    })
  }

}
