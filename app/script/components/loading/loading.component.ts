import { Component } from '@angular/core';

let template: string = require('./loading.component.html');
let style: string = require('./loading.component.scss');

@Component({
  selector: 'loading',
  template: template,
  styles: [style]
})
export class LoadingComponent {}
