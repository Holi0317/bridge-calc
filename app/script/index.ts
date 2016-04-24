import {enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './components/app.component';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent);
