import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';

import { Utils } from '../../providers/app-utils';

import { FabButton } from '../../providers/graphic-2d/fab-button';
import { GestureEvent } from '../../providers/graphic-2d/gesture-event';
import { Vec2 } from '../../providers/graphic-2d/vec2';

import { BdpModule } from '../../providers/bdp-module';

import { Player } from '../../providers/classes/player';
import { Team } from '../../providers/classes/team';
import { Map, MapElement } from '../../providers/classes/map';



class PrivateElement {
  id: number;
  playerId: string;
  name: string;
  number: string;
  avatar: string;
  x: number;
  y: number;

  setData(id: number, data: Player) {
    this.id = id;
    this.playerId = data.id;
    this.name = data.name;
    this.number = data.number;
    this.avatar = data.avatar;
  }

  setLocation(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

@IonicPage()
@Component({
  selector: 'page-bdp-team-strategy',
  templateUrl: 'bdp-team-strategy.html',
})
export class BdpTeamStrategyPage {
  @ViewChild(Content) content: Content;
  strategyElm: HTMLElement;
  contentPadding = 16;

  strategyMap: Map;

  team: Team;
  mPlayers: Array<PrivateElement> = [];
  fabArr: Array<FabButton> = [];

  strategies = [
    {
      id: '0',
      text: '2-3-1',
      distribute: [2, 3, 1]
    }, {
      id: '1',
      text: '2-1-2-1',
      distribute: [2, 1, 2, 1]
    }, {
      id: '2',
      text: '3-2-1',
      distribute: [3, 2, 1]
    }, {
      id: '3',
      text: '3-1-2',
      distribute: [3, 1, 2]
    }
  ];
  currentStrategy = {
    strategy: this.strategies[0],
    coor: []
  }

  constructor(public navCtrl: NavController,
    public mAlertController: AlertController,
    public mBdpModule: BdpModule,
    public navParams: NavParams) {
    console.log(navParams.data['id']);
    this.team = mBdpModule.getTeamById(navParams.data['id']);
    console.log(this.team);


    this.onLoadData(mBdpModule.strategyMaps[0])
  }


  ionViewDidEnter() {
    console.log('ionViewDidEnter BdpStrategyPage');
    this.strategyElm = document.getElementById("strategy-content");
    this.initPlayerFab();
    console.log(this.strategyMap);
    console.log(this.mBdpModule.players);
  }

  onLoadData(map: Map) {
    let i = 0;
    map.elements.forEach(ele => {
      let player = this.mBdpModule.getPlayerById(ele.id);
      let pE: PrivateElement = new PrivateElement();
      pE.setData(i, player);
      pE.setLocation(ele.vec2.x, ele.vec2.y);
      this.mPlayers.push(pE);
      i++;
    });

    this.strategyMap = new Map(map.id, map.name);
    this.strategyMap.setElements(map.elements);
  }

  initPlayerFab() {
    this.fabArr = [];
    let elm = document.getElementsByClassName("player");
    let view = document.getElementsByClassName("player-view");
    let arr = [].slice.call(elm);

    let lPadding = (this.content.contentWidth - this.strategyElm.clientWidth) / 2

    arr.forEach(element => {
      let index = arr.indexOf(element);
      let calculatedWidth = lPadding + this.mPlayers[index].x * this.strategyElm.clientWidth;
      let calculatedHeight = this.contentPadding + this.mPlayers[index].y * this.strategyElm.clientHeight;
      this.mPlayers[index].setLocation(calculatedWidth, calculatedHeight);

      let player = new FabButton();

      player.create(element);
      player.setRelativeHTMLContent(<HTMLElement>view[index])
      player.setPadding(this.contentPadding, lPadding, 0, lPadding);
      player.setBoundSize(this.strategyElm.clientWidth + 2 * this.contentPadding +lPadding, this.strategyElm.clientHeight + 2 * this.contentPadding);
      player.setEventListener((event, data) => {
        this.onPlayerEvents(event, data);
      });
      player.setId(this.fabArr.length);
      player.setPosition(calculatedWidth, calculatedHeight);
      this.fabArr.push(player);
    });
  }

  onPlayerEvents(event, data) {
    // console.log(event);
  }

  onClickTitle() {
    console.log("onClickTitle");
  }

  onClickSuggest() {
    let alert = this.mAlertController.create();
    alert.setTitle('Sơ đồ');

    this.strategies.forEach(str => {

      alert.addInput({
        type: 'radio',
        label: str.text,
        value: str.id,
        checked: this.currentStrategy.strategy.id == str.id
      });

    })

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        for (let i = 0; i < this.strategies.length; i++) {
          if (this.strategies[i].id == data) {
            this.currentStrategy.strategy = this.strategies[i];
            break;
          }
        }
        this.onStrategyChanged();
      }
    });
    alert.present();
  }

  onStrategyChanged() {
    this.currentStrategy.coor = [];

    let goalKeeper = new Vec2(0.5, 1);

    this.currentStrategy.coor.push(goalKeeper);

    // chia sơ đồ thành các phần dọc theo sân
    for (let i = 0; i < this.currentStrategy.strategy.distribute.length; i++) {
      let y = 1 - ((i + 1) / (this.currentStrategy.strategy.distribute.length + 1));

      // chia đều các tuyến theo số cầu thủ của từng tuyến
      let numberOfPlayers = this.currentStrategy.strategy.distribute[i];
      for (let j = 1; j < numberOfPlayers + 1; j++) {
        let x = j / (numberOfPlayers + 1);

        let coor = new Vec2(x, y);
        this.currentStrategy.coor.push(coor);
      }
    }
    this.arrangePlayerByStrategy();
  }

  // sắp xếp các cầu thủ theo chiến thuật đã chọn
  arrangePlayerByStrategy() {
    if (this.currentStrategy.coor) {
      let width = this.strategyElm.clientWidth;
      let height = this.strategyElm.clientHeight;

      // mảng tạm thời nhằm tránh sắp xếp lại các cầu thủ đã xếp
      let tempFabArr: Array<FabButton> = [];
      this.fabArr.forEach(element => {
        tempFabArr.push(element);
      });

      let elmWidth = this.fabArr[0].mElementSize.width;
      let elmHeight = this.fabArr[0].mElementSize.height;

      for (let j = 0; j < this.currentStrategy.coor.length; j++) {
        let coor = this.currentStrategy.coor[j];

        let x = width * coor.x + this.contentPadding - 1 / 2 * elmWidth;
        let y = height * coor.y + this.contentPadding - 1 / 2 * elmHeight - ((j == 0) ? (1 / 2 * elmHeight) : 0);

        let nearest = this.findNearestPlayer(x, y, tempFabArr);

        for (let i = 0; i < this.fabArr.length; i++) {
          if (this.fabArr[i] == nearest) {
            tempFabArr.splice(tempFabArr.indexOf(nearest), 1);
            this.fabArr[i].setPosition(x, y);
            this.mPlayers[i].setLocation(x, y);
            break;
          }
        }
      }
      this.resetPosition(tempFabArr);
    }
  }

  // Tìm cầu thủ gần nhất
  findNearestPlayer(x: number, y: number, fabArr: Array<FabButton>) {
    let result = fabArr[0];
    let min = Math.abs(this.fabArr[0].getPosition().current.x - x) + Math.abs(this.fabArr[0].getPosition().current.y - y);

    fabArr.forEach(player => {
      let distance = Math.abs(player.getPosition().current.x - x) + Math.abs(player.getPosition().current.y - y);

      if (distance < min) {
        result = player;
        min = distance;
      }
    });

    return result;
  }

  resetPosition(fabArr: Array<FabButton>) {
    for (let j = 0; j < fabArr.length; j++) {
      let element = fabArr[j];
      for (let i = 0; i < this.fabArr.length; i++) {
        if (this.fabArr[i] == element) {
          let x = this.strategyElm.clientWidth + this.contentPadding * 2;
          let y = this.contentPadding + (this.contentPadding + element.mElementSize.height) * j;
          this.fabArr[i].setPosition(x, y);
          this.mPlayers[i].setLocation(x, y);
          break;
        }
      }
    }
  }

  onClickSave() {
    this.strategyMap.elements = [];
    this.fabArr.forEach(fabBtn => {
      for (let i = 0; i < this.mPlayers.length; i++) {
        let player = this.mPlayers[i];
        if (fabBtn.id == this.mPlayers[i].id) {
          let mapElement = new MapElement(player.playerId);
          mapElement.setVec2((fabBtn.getPosition().current.x - this.contentPadding) / this.strategyElm.clientWidth, (fabBtn.getPosition().current.y - this.contentPadding) / this.strategyElm.clientHeight);
          this.strategyMap.elements.push(mapElement);
        }
      }
    });
    this.mBdpModule.strategyMaps[0].onResponseData(this.strategyMap);
    this.navCtrl.pop();
  }
}