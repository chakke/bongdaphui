import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Utils } from './app-utils';

import { Team } from './classes/team';
import { Map, MapElement } from './classes/map';
import { Player } from './classes/player';

@Injectable()
export class BdpModule {

  teams: Array<Team> = [];
  players: Array<Player> = [];
  strategyMaps: Array<Map> = [];

  constructor(public http: HttpClient) {
    this.createFakeData();
  }

  createFakeData() {
    let strategyMap = new Map(1, "Chiến thuật 1");
    let avatars = [
      "assets/player/ronaldo.jpg",
      "assets/player/messi.jpg",
      "assets/player/ibrahimovic.jpg",
      "assets/player/pirlo.jpg",
      "assets/player/rooney.jpg",
    ];
    let mapElements: Array<MapElement> = [];
    for (let i = 0; i < 10; i++) {
      let nId = Utils.randInt(0, 100);
      let mapE = new MapElement(nId < 10 ? "0000" + nId : "000" + nId);
      mapElements.push(mapE);
    }
    strategyMap.setElements(mapElements);
    this.strategyMaps.push(strategyMap);

    for (let i = 0; i < 100; i++) {
      let player = new Player();
      player.onResponseData(i < 10 ? "0000" + i : "000" + i, "name", "" + i, avatars[Utils.randInt(0, avatars.length)], "0912345678", "heyhey@gmail.com");
      this.players.push(player);
    }

    let team = new Team();
    team.onResponseData(this.teams.length + 1, "B-Gate FC");
    this.teams.push(team);
    for (let i = 0; i < 10; i++) {
      let nId = Utils.randInt(0, 100);
      let player = this.getPlayerById(nId < 10 ? "0000" + nId : "000" + nId);
      team.addMember(player);
    }
    let fakeP = new Player();
    fakeP.onResponseData("-111", "AA", "12", "assets/player/anonymous.png");
    team.addFakeMember(fakeP);
  }

  getTeams(){
    return this.teams;
  }

  getTeamById(id: number) {
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].id == id) {
        return this.teams[i];
      }
    }
    return null;
  }

  getPlayerById(id: string) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id == id) {
        return this.players[i];
      }
    }
    return null;
  }

  addTeamMember(teamId: number, member: Player) {
    let team = this.getTeamById(teamId);

    if (team) {
      team.addMember(member);
    }
  }

  deleteTeamMember(teamId: number, member: Player) {
    let team = this.getTeamById(teamId);

    if (team) {
      team.removeMember(member);
    }
  }
  
  getTeamFakeMember(teamId: number, memberId: string){
    let team = this.getTeamById(teamId);

    if (team) {  
      return team.getFakeMember(memberId);
    }
    return null;
  }

  addTeamFakeMember(teamId: number, member: Player) {
    let team = this.getTeamById(teamId);

    if (team) {
      team.addFakeMember(member);
    }
  }
  
  deleteTeamFakeMember(teamId: number, member: Player) {
    let team = this.getTeamById(teamId);

    if (team) {
      team.removeFakeMember(member);
    }
  }

  editFakeMember(teamId: number, member: Player){
    let team = this.getTeamById(teamId);

    if (team) {
      team.editFakeMember(member);
    }
  }

  searchPlayer(id: string) {
    return new Promise((res, rej) => {
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].id == id) {
          setTimeout(() => {
            res(this.players[i]);
          }, 2000);
        }
      }
      setTimeout(() => {
        rej("nodata");
      }, 2000);
    });
  }
}
