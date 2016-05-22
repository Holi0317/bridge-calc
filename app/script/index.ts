import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './components/app.component';

import minilog = require('minilog');

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
} else {
  minilog.enable();
}

bootstrap(AppComponent);
