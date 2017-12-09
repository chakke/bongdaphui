import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { FirebaseServiceProvider } from "../firebase-service/firebase-service";

import { Observable } from "rxjs/Observable";

import { Stadium, StadiumInterface } from "../interface/stadium";

@Injectable()
export class AppControllerProvider {
    constructor(
        public firebaseService: FirebaseServiceProvider
    ) { }
    // getStadiumById(stadiumId: string): Observable<StadiumInterface> {
    //     return this.firebaseService.getStaduim(stadiumId).map(elm => {
    //         return {
    //             id: elm.id,
    //             name: elm.name,
    //             items: elm.items
    //         }
    //     });
    // }
}