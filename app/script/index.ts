import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './components/app.component';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent);
