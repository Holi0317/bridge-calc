import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {LayoutService} from '../services/layout-service';

@inject(LayoutService, Router)
export class Menu {
  layoutService: LayoutService;
  router: Router;

  constructor(layoutService: LayoutService, router: Router) {
    this.layoutService = layoutService;
    this.router = router;
  }

  activate() {
    this.layoutService.title = 'Bridge calculator';
  }

  goto(name: string) {
    this.router.navigateToRoute(name);
  }

}
