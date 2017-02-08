import {autoinject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {LayoutService} from './services/layout-service';
import {RouterConfiguration, Router, NavigationInstruction} from 'aurelia-router';

const logger = getLogger('app');

@autoinject()
export class App {
  private _router: Router;

  constructor(private _layoutService: LayoutService) {

  }

  configureRouter(config: RouterConfiguration, router: Router) {
    const preActive = new PreActiveStep(this._layoutService);

    config.title = 'Bridge calculator';
    config.options.pushState = !location.host.includes('github'); // GitHub does not support push state
    config.addPreActivateStep(preActive);
    config.map([
      { route: '', name: 'menu', moduleId: './menu/menu' },
      { route: '/entry', name: 'entry', moduleId: './entry/entry', title: 'New Game' },
      { route: '/game', name: 'game', moduleId: './game/game' }
    ]);

    this._router = router;
  }

  showHelp() {
    // TODO Show help with a dialog
  }

  back() {
    this._router.navigateToRoute('menu');
  }
}

class PreActiveStep {
  constructor(private _layoutService: LayoutService) {

  }

  run(navigationInstruction: NavigationInstruction, next: Function) {
    this._layoutService.title = navigationInstruction.config.title;
    return next();
  }
}
