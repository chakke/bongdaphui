import { Player } from './player';
import { Map } from './map';

export class Team {
    id: number;
    name: string;
    members: Array<Player>;
    fakePlayer: Array<Player>;
    strategies: Array<Map>

    constructor() {
        this.id = -1;
        this.name = "";
        this.members = [];
        this.fakePlayer = [];
        this.strategies = [];
    }

    onResponseData(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    addMember(member: Player) {
        this.members.push(member);
    }

    removeMember(member: Player) {
        for (let i = 0; i < this.members.length; i++) {
            if (this.members[i].id == member.id) {
                this.members.splice(i, 1);
                break;
            }
        }
    }

    getFakeMember(id: string){
        for (let i = 0; i < this.fakePlayer.length; i++) {
            if (this.fakePlayer[i].id == id) {
                return this.fakePlayer[i];
            }
        }
        return null;
    }

    addFakeMember(member: Player) {
        member.id += this.fakePlayer.length;
        this.fakePlayer.push(member);
    }

    removeFakeMember(member: Player) {
        for (let i = 0; i < this.fakePlayer.length; i++) {
            if (this.fakePlayer[i].id == member.id) {
                this.fakePlayer.splice(i, 1);
                break;
            }
        }
    }

    editFakeMember(member: Player){
        for (let i = 0; i < this.fakePlayer.length; i++) {
            if (this.fakePlayer[i].id == member.id) {
                this.fakePlayer[i].setData(member);
                break;
            }
        }
    }

    addStrategy(strategy: Map) {
        this.strategies.push(strategy);
    }
}

export class TeamOverview {
    id: number;
    name: string;
    noMembers: number;

    onResponseData(data) {
        this.id = data.id;
        this.name = data.name;
        this.noMembers = data.members.length;
    }
}