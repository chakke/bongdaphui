import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { FirebaseServiceProvider } from "../../providers/classes/firebase-service/firebase-service";
import { Observable } from 'rxjs/Observable';
import { Stadium, StadiumInterface } from "../../providers/classes/interface/stadium";
import { BdpModule } from "../../providers/bdp-module";

import { monney } from "../../providers/classes/interface/monney";

interface downPayment {
  nameOfStadium: string;
  monney: number;
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




  downPayment: downPayment[] = [
    { nameOfStadium: "Sân lớn", monney: 50000, address: "21 Bà Triệu", timeBegin: "8:00pm", phoneStadiumOwner: 11589 },
    { nameOfStadium: "Sân bé", monney: 100000, address: "11 Đại Cồ Việt", timeBegin: "7:00pm", phoneStadiumOwner: 77893 },
    { nameOfStadium: "Sân Chợ Lớn", monney: 75000, address: "31 Cầu Giấy", timeBegin: "6:30pm", phoneStadiumOwner: 223789 },
    { nameOfStadium: "Sân Cháy", monney: 150000, address: "78 Đống Đa", timeBegin: "4:30pm", phoneStadiumOwner: 66683 }
  ];


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
  /**Nộp quỹ */
  addMonney() {
    let alertMonney = this.alertCtrl.create();
    alertMonney.setTitle('Thu quỹ');
    alertMonney.addInput({
      type: 'radio',
      label: '10000đ',
      value: '10000',
      checked: this.checked(10000)
    });
    alertMonney.addInput({
      type: 'radio',
      label: '20000đ',
      value: '20000',
      checked: this.checked(20000)      
    });
    alertMonney.addInput({
      type: 'radio',
      label: '50000đ',
      value: '50000',
      checked: this.checked(50000)   
    });
    alertMonney.addInput({
      type: 'radio',
      label: '100000đ',
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
                  this.monneyCollect = parseInt(otherMonney.otherMonney);
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
              this.monneyCollect = parseInt(data);
            }
          });
          alertConfirm.present();
        }
      }
    });
    alertMonney.present();
  }
  checked(number: number): boolean {
    let checked: boolean;
    if (number == this.monneyCollect) {
      checked = true;
    } else {
      checked = false;
    }
    return checked;
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
    this.navCtrl.push("WalletDetailPage", { walletDetail: {
      tongQuy: this.tongQuy,
      monneyCollect: this.monneyCollect,
      members: this.mBdpModule.getTeams()[0].members
    }})
  }
  /**Thêm quỹ */
  addPayment() {
    let collectType = this.alertCtrl.create();
    collectType.setTitle('Loại khoản thu');
    collectType.setMessage('Chọn khoản thu:')
    collectType.addInput({
      type: 'radio',
      label: 'Thu từ thành viên',
      value: 'member'
    });
    collectType.addInput({
      type: 'radio',
      label: 'Thu từ khoản khác',
      value: 'other'
    });
    collectType.addButton('Hủy');
    collectType.addButton({
      text: 'Ok',
      handler: dataCollect => {
        if (dataCollect == "member") {
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
          alertClub.addButton('Hủy');
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
                  this.collectMonney.push({
                    name: data,
                    monney: personerMonney
                  });
                }
              })
              alertMember.present();

            }
          })
          alertClub.present();
        }
        else if (dataCollect == "other") {
          let otherCollect = this.alertCtrl.create();
          otherCollect.setTitle('Khoản thu khác');
          otherCollect.addInput({
            name: 'name',
            type: 'text',
            placeholder: 'Tên nguồn thu khác'
          });
          otherCollect.addInput({
            name: 'monney',
            type: 'number',
            placeholder: 'Số tiền'
          });
          otherCollect.addButton('Hủy');
          otherCollect.addButton({
            text: 'Ok',
            handler: data => {
              let otherMonney: number = parseInt(data.monney);
              this.tongQuy = this.tongQuy + otherMonney;
              this.collectMonney.push({
                name: data.name,
                monney: otherMonney
              })
            }
          })
          otherCollect.present();
        }

      }
    })
    collectType.present();
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
                  this.spendMonney.push({
                    name: data.nameStadium,
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
                this.spendMonney.push({
                  name: item.nameOfStadium,
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
          this.collectMonney.push({
            name: item.nameOfStadium,
            monney: item.monney
          });
        }
      }]
    });
    alert.present();
  }

  /**Hiển thị item */
  lastItem(listItem): number {
    let i = listItem.length;
    return i
  }
  threeLast(listItem): number {
    let i = listItem.length - 3;
    return i
  }

}
