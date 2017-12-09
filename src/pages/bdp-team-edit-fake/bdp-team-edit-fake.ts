import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { BdpModule } from '../../providers/bdp-module';
import { Player } from '../../providers/classes/player';

@IonicPage()
@Component({
  selector: 'page-bdp-team-edit-fake',
  templateUrl: 'bdp-team-edit-fake.html',
})
export class BdpTeamEditFakePage {

  mDatas = {
    title: "Sửa thông tin",
    playerInfo: {
      name: "Tên",
      phone: "Số điện thoại",
      email: "Email",
      shirtNumber: "Số áo",
      avatar: "Ảnh đại diện"
    },
    teamId: -1
  }

  createForm: FormGroup;

  mPlayer = new Player();
  resultPlayer: Player = null;

  constructor(public navCtrl: NavController,
    public mFormBuilder: FormBuilder,
    public mBdpModule: BdpModule,
    public mAlertController: AlertController,
    public navParams: NavParams) {
    if (navParams.data['player']) {
      this.mPlayer = Object.assign({}, navParams.data['player']);
    }
    if(navParams.data['teamId']){
      this.mDatas.teamId = navParams.data['teamId'];
    }
    console.log(this.mPlayer);

    this.setUpForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BdpTeamEditFakePage');
  }

  setUpForm() {
    this.createForm = this.mFormBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]*'), Validators.required])],
      shirtNumber: ['', Validators.compose([Validators.max(999), Validators.required])],
      phone: [''],
      email: ['']
    });
  }

  onClickSave() {
    this.save();
  }

  save(){
    this.mBdpModule.editFakeMember(this.mDatas.teamId, this.mPlayer);
    this.navCtrl.pop();
  }

}
