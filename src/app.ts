import {autoinject, PLATFORM} from 'aurelia-framework'
import {NavigationInstruction, Router, RouterConfiguration} from 'aurelia-router'
import {LayoutService} from './services/layout-service'

@autoinject()
export class App {
  private _router: Router

  constructor(private _layoutService: LayoutService) {

  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    const preActive = new PreActiveStep(this._layoutService)

    config.title = 'Bridge calculator'
    config.options.pushState = !location.host.includes('github') // GitHub does not support push state
    config.addPreActivateStep(preActive)
    config.map([
      { route: '', name: 'menu', moduleId: PLATFORM.moduleName('./menu/menu')},
      { route: '/entry', name: 'entry', moduleId: PLATFORM.moduleName('./entry/entry'), title: 'New Game' },
      { route: '/game', name: 'game', moduleId: PLATFORM.moduleName('./game/game' )}
    ])

    this._router = router
  }

  public showHelp() {
    // TODO Show help with a dialog
  }

  public back() {
    this._router.navigateToRoute('menu')
  }
}

class PreActiveStep {
  constructor(private _layoutService: LayoutService) {

  }

  public run(navigationInstruction: NavigationInstruction, next: Function) {
    this._layoutService.title = navigationInstruction.config.title
    return next()
  }
}
