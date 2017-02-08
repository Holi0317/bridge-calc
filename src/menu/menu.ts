import {autoinject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {LayoutService} from '../services/layout-service';

@autoinject()
export class Menu {
  constructor(
    private _layoutService: LayoutService,
    private _router: Router
  ) {

  }

  activate() {
    this._layoutService.title = 'Bridge calculator';
  }

  goto(name: string) {
    this._router.navigateToRoute(name);
  }

}
