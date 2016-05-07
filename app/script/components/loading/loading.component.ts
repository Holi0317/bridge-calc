import { Component } from '@angular/core';
import { MdSpinner } from '@angular2-material/progress-circle/';

let template: string = require('./loading.component.html');
let style: string = require('./loading.component.scss');

@Component({
  selector: 'loading',
  template: template,
  styles: [style],
  directives: [MdSpinner]
})
export class LoadingComponent {}
