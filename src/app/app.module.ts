import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";

import { MyApp } from './app.component';
import { BdpModule } from '../providers/bdp-module';

import { AppControllerProvider } from "../providers/classes/app-controller/app-controller";
import { FirebaseServiceProvider } from "../providers/classes/firebase-service/firebase-service";

import { AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule, AngularFirestore } from "angularfire2/firestore";

export const Config = {
  apiKey: "AIzaSyAEmI2YOtLnpPuqWvmq_KXQMZNf-LEXadE",
  authDomain: "bongdaphui-58b4d.firebaseapp.com",
  databaseURL: "https://bongdaphui-58b4d.firebaseio.com",
  projectId: "bongdaphui-58b4d",
  storageBucket: "bongdaphui-58b4d.appspot.com",
  messagingSenderId: "1064104914696"
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(Config),
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BdpModule,
    AppControllerProvider,
    FirebaseServiceProvider
  ]
})
export class AppModule { }
