export interface member{
    name: string;
    facebookId: string;
    monney:number;
}
export class member{
    name: string;
    id: string;
    facebookId: string;
    avatar: string;
    email: string;
    monney: number;
    getMember(data){
        this.name = data.name;
        this.id = data.id;
        this.facebookId = data.facebookId;
        this.avatar = data.avatar;
        this.email = data.email;
        this.monney = 10000;
    }
}