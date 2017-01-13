import {inject} from 'aurelia-framework';
import {LayoutService} from './services/layout-service';

import type {RouterConfiguration, Router} from 'aurelia-router';

@inject(LayoutService)
export class App {
  router: Router;
  layoutService: LayoutService;

  constructor(layoutService: LayoutService) {
    this.layoutService = layoutService;
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Bridge calculator';
    config.options.pushState = !location.host.includes('github'); // GitHub does not support push state
    config.map([
      { route: '', name: 'menu', moduleId: './menu/menu' },
      { route: '/entry', name: 'entry', moduleId: './entry/entry', title: 'New Game' }
    ]);

    this.router = router;
  }

  showHelp() {
    // TODO Show help with a dialog
  }

  back() {
    this.router.navigateToRoute('menu');
  }
}
