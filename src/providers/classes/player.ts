

export class Player {
    id: string;
    name: string;
    number: string;
    avatar: string;
    email: string;
    phone: string;

    constructor() {
        this.id = "";
        this.name = "";
        this.number = "";
        this.avatar = "assets/player/anonymous.png";
        this.email = "";
        this.phone = "";
    }

    onResponseData(id: string, name: string, number: string, avatar: string, phone?: string, email?: string) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.avatar = avatar;
        if (phone) {
            this.phone = phone;
        }
        if (email) {
            this.email = email;
        }
    }

    setData(data) {
        this.id = data.id;
        this.name = data.name;
        this.number = data.number;
        this.avatar = data.avatar;
        if (data.phone) {
            this.phone = data.phone;
        }
        if (data.email) {
            this.email = data.email;
        }
    }
}