import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BdpModule {

  constructor(public http: HttpClient) {
    console.log('Hello BdpModuleProvider Provider');
  }

}
