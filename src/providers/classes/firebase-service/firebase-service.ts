import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

@Injectable()
export class FirebaseServiceProvider {

    constructor() { }
    getMember(): Observable<any> {
        return new Observable
    }
    getStaduim(): Observable<any> {
        return new Observable(obs => {
            obs.next({
                items: [
                    {
                        id: "0",
                        nameStadium: "Sân Cỏ 1",
                        address: "Đường số 1",
                        phone: "09090900",
                        timeBegin: "8:30pm"
                    }, {
                        id: "1",
                        nameStadium: "Sân Cỏ 2",
                        address: "Đường số 2",
                        phone: "09090901",
                        timeBegin: "1:30pm"
                    }, {
                        id: "2",
                        nameStadium: "Sân Cỏ 3",
                        address: "Đường số 3",
                        phone: "09090902",
                        timeBegin: "4:30pm"
                    }, {
                        id: "3",
                        nameStadium: "Sân Cỏ 4",
                        address: "Đường số 4",
                        phone: "09090903",
                        timeBegin: "8:0pm"
                    }, {
                        id: "4",
                        nameStadium: "Sân Cỏ 5",
                        address: "Đường số 5",
                        phone: "09090904",
                        timeBegin: "9:30pm"
                    }, {
                        id: "5",
                        nameStadium: "Sân Cỏ 6",
                        address: "Đường số 6",
                        phone: "09090905",
                        timeBegin: "5:30pm"
                    }, {
                        id: "6",
                        nameStadium: "Sân Cỏ 7",
                        address: "Đường số 7",
                        phone: "09090906",
                        timeBegin: "3:00pm"
                    }, {
                        id: "7",
                        nameStadium: "Sân Cỏ 8",
                        address: "Đường số 8",
                        phone: "09090907",
                        timeBegin: "7:00pm"
                    }, {
                        id: "8",
                        nameStadium: "Sân Cỏ 9",
                        address: "Đường số 9",
                        phone: "09090908",
                        timeBegin: "6:30pm"
                    }, {
                        id: "9",
                        nameStadium: "Sân Cỏ 10",
                        address: "Đường số 10",
                        phone: "09090909",
                        timeBegin: "12:30pm"
                    }
                ]
            })
        })

    }
}