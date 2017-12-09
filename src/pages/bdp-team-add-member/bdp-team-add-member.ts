import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { BdpModule } from '../../providers/bdp-module';
import { Player } from '../../providers/classes/player';

@IonicPage()
@Component({
  selector: 'page-bdp-team-add-member',
  templateUrl: 'bdp-team-add-member.html',
})
export class BdpTeamAddMemberPage {

  mDatas = {
    title: "Thêm thành viên",
    segments: [
      {
        id: "0",
        title: "Tạo mới"
      }, {
        id: "1",
        title: "Tìm kiếm"
      }
    ],
    playerInfo: {
      name: "Tên",
      phone: "Số điện thoại",
      email: "Email",
      shirtNumber: "Số áo",
      avatar: "Ảnh đại diện"
    },
    teamId: -1,
    teamName: ""
  }

  createForm: FormGroup;
  submitAttempt = false;

  mPlayer = new Player();
  resultPlayer: Player = null;

  currentView = this.mDatas.segments[0].id;
  isLoading = false;


  constructor(public navCtrl: NavController,
    public mAlertController: AlertController,
    public mFormBuilder: FormBuilder,
    public mToastController: ToastController,
    public mBdpModule: BdpModule,
    public navParams: NavParams) {
    if (navParams.data['id']) {
      this.mDatas.teamId = navParams.data['id'];

    }
    if (navParams.data['name']) {
      this.mDatas.teamName = navParams.data['name'];
    }
    console.log(navParams.data['id']);

    this.setUpForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BdpTeamAddMemberPage');
  }

  onChangeView() {
    console.log(this.currentView);
  }

  setUpForm() {
    this.createForm = this.mFormBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*'), Validators.required])],
      shirtNumber: ['', Validators.compose([Validators.max(999), Validators.required])],
      phone: [''],
      email: ['']
    });
  }

  onClickSearch() {
    let alert = this.mAlertController.create({
      title: 'Tìm kiếm',
      message: "Nhập vào ID người dùng",
      inputs: [
        {
          name: 'id',
          placeholder: 'vd: 00002'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Search',
          handler: data => {
            console.log('Saved clicked', data);
            this.searchPlayer(data.id);
          }
        }
      ]
    });

    alert.present();
  }

  searchPlayer(id: string) {
    this.showLoading();
    this.mBdpModule.searchPlayer(id).then(data => {
      if (data) {
        this.resultPlayer = new Player();
        this.resultPlayer.setData(data)
        console.log(data);
      }
      this.hideLoading();
    }).catch(e => {
      this.showToast();
      this.hideLoading();
    });
  }

  onClickAdd() {
    console.log("onClickAdd");
    
    this.submitAttempt = true;
    if (this.createForm.valid || this.currentView == this.mDatas.segments[1].id) {
      let alert = this.mAlertController.create({
        title: 'Thêm thành viên',
        message: this.currentView == this.mDatas.segments[0].id ? "Bạn muốn thêm thành viên mới vào đội?" : "Bạn muốn gửi lời mời gia nhập đội bóng?",
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: this.currentView == this.mDatas.segments[0].id ? 'OK' : "Gửi",
            handler: data => {
              console.log('Saved clicked');
              this.addMember();
            }
          }
        ]
      });

      alert.present();
    }
  }

  addMember() {
    if (this.currentView == this.mDatas.segments[0].id) {
      this.mPlayer.onResponseData("-", this.createForm.value.name, this.createForm.value.shirtNumber, this.mPlayer.avatar, this.createForm.value.phone)
      this.mBdpModule.addTeamFakeMember(this.mDatas.teamId, this.mPlayer);
    }
    else {
      // send request to User 'this.resultPlayer'
    }

    this.navCtrl.pop();
  }

  hideLoading() {
    let loading = document.getElementById("loading");
    if (!loading.classList.contains("hidden")) {
      loading.classList.add("hidden");
    }
    this.isLoading = false;
  }

  showLoading() {
    this.isLoading = true;
    let loading = document.getElementById("loading");
    if (loading.classList.contains("hidden")) {
      loading.classList.remove("hidden");
    }
  }

  showToast() {
    let toast = this.mToastController.create({
      message: 'Không tìm thấy người dùng',
      duration: 3000
    });
    toast.present();
  }

}
