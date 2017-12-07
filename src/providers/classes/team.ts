import { Player } from './player';
import { Map } from './map';

export class Team {
    id: number;
    name: string;
    members: Array<Player>;
    strategies: Array<Map>

    constructor() {
        this.id = -1;
        this.name = "";
        this.members = [];
        this.strategies = [];
    }

    onResponseData(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    addMember(member: Player) {
        this.members.push(member);
    }

    addStrategy(strategy: Map) {
        this.strategies.push(strategy);
    }
}

export class TeamOverview {
    id: number;
    name: string;
    noMembers: number;

    onResponseData(data){
        this.id = data.id;
        this.name = data.name;
        this.noMembers = data.members.length;
    }
}