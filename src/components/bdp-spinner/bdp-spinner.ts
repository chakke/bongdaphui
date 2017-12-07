import { Component } from '@angular/core';

/**
 * Generated class for the BdpSpinnerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'bdp-spinner',
  templateUrl: 'bdp-spinner.html'
})
export class BdpSpinnerComponent {

  text: string;

  constructor() {
    console.log('Hello BdpSpinnerComponent Component');
    this.text = 'Hello World';
  }

}
