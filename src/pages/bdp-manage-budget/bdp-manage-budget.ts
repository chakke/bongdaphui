import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { FirebaseServiceProvider } from "../../providers/classes/firebase-service/firebase-service";
import { Observable } from 'rxjs/Observable';
import { Stadium, StadiumInterface } from "../../providers/classes/interface/stadium";
import { BdpModule } from "../../providers/bdp-module";

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
    public alertCtrl: AlertController,
    public firebaseService: FirebaseServiceProvider,
    public mBdpModule: BdpModule
  ) {
  }

  ionViewDidLoad() {
    // console.log(this.itemHistoryTest);
    this.getData();
  }

  getData() {
    let ts = this.mBdpModule.getTeams();
    // console.log(ts[0].name);

    ts.forEach(t => {
      // console.log(t);

      // let team = new TeamOverview();
      // team.onResponseData(t);
      // this.teams.push(team);
    })
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
        type: 'number',
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
    let alertClub = this.alertCtrl.create();
    alertClub.setTitle('Tên thành viên');
    let listClub = this.mBdpModule.getTeams();
    listClub[0].members.forEach(item => {
      alertClub.addInput({
        type: 'radio',
        label: item.name + item.number,
        value: item.name + item.number
      });
    });
    alertClub.addButton('Cancel');
    alertClub.addButton({
      text: 'Ok',
      handler: data => {
        let alertMember = this.alertCtrl.create();
        alertMember.setTitle(data);
        alertMember.addInput({
          name: 'monney',
          type: 'number',
          placeholder: 'Số tiền nộp'
        });
        alertMember.addButton('Hủy');
        alertMember.addButton({
          text: 'Ok',
          handler: data1 => {
            let personerMonney: number = parseInt(data1.monney);
            this.tongQuy = this.tongQuy + personerMonney;
            this.personer.push({
              name: data,
              monney: personerMonney
            });
            this.itemHistoryTest.push({
              name: data,
              type: "Thu",
              monney: personerMonney
            });
          }
        })
        alertMember.present();

      }
    })
    alertClub.present();

  }
  /**Khoản khác */
  addMoreMonney() {
    let alert = this.alertCtrl.create({
      title: 'Tiền khác',
      inputs: [{
        name: 'nameOfStadium',
        placeholder: 'Tên đại diện'
      }, {
        type: 'number',
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
      message:
        "Tên sân:" + '&emsp;' + item.nameOfStadium + '<br>' +
        "Đặt cọc:" + '&emsp;' + item.monney + "đ" + '<br>' +
        "Số đt:" + '&emsp;&emsp;' + item.phoneStadiumOwner + '<br>' +
        "Địa chỉ:" + '&emsp;' + item.address,
      buttons: [{
        text: 'Ok'
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
            'Tên sân:' + '&emsp;' + data.nameStadium + '<br>' +
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
                  this.itemHistoryTest.push({
                    name: data.nameStadium,
                    type: "Chi",
                    monney: monney
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
  /**Thanh toán*/
  doPaymentItem(item: downPayment, index: number) {
    let alert = this.alertCtrl.create({
      title: 'Thanh toán ' + item.nameOfStadium,
      message: item.phoneStadiumOwner.toString(),
      inputs: [{
        type: 'number',
        name: 'monney',
        placeholder: 'Tổng tiền thuê sân'
      }, {
        type: 'number',
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
  deletePaymentItem(item: any, index: number) {
    let alert = this.alertCtrl.create({
      message: 'Bạn có chắc muốn hủy đặt sân',
      buttons: [{
        text: 'Không'
      }, {
        text: 'Có',
        handler: () => {
          this.downPayment.splice(index, 1);
          this.tongQuy = this.tongQuy + item.monney;
          this.itemHistoryTest.push({
            name: item.nameOfStadium,
            type: 'Thu',
            monney: item.monney
          })
        }
      }]
    });
    alert.present();
  }
}
