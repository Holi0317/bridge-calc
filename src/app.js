import {inject, LogManager} from 'aurelia-framework';
import {LayoutService} from './services/layout-service';

import type {RouterConfiguration, Router, NavigationInstruction} from 'aurelia-router';

const logger = LogManager.getLogger('app');

@inject(LayoutService)
export class App {
  router: Router;
  layoutService: LayoutService;

  constructor(layoutService: LayoutService) {
    this.layoutService = layoutService;
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    const preActive = new PreActiveStep(this.layoutService);

    config.title = 'Bridge calculator';
    config.options.pushState = !location.host.includes('github'); // GitHub does not support push state
    config.addPreActivateStep(preActive);
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

class PreActiveStep {
  layoutService: LayoutService;

  constructor(layoutService: LayoutService) {
    this.layoutService = layoutService;
  }

  run(navigationInstruction: NavigationInstruction, next: Function) {
    this.layoutService.title = navigationInstruction.config.title;
    return next();
  }
}
