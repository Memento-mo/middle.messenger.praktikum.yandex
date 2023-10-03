import Route from './route'

class Router {
  private static __instance: Router | null = null;

  private routes: Route[] = []

  private history: History | undefined = window.history

  private _currentRoute: Route | null = null

  private _rootQuery: string | undefined

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []
    this._rootQuery = rootQuery

    Router.__instance = this
  }

  public use(pathname: string, block: any) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery })
    this.routes.push(route)

    return this
  }

  start(initOnly: boolean = false) {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    if (!initOnly) {
      this._onRoute(window.location.pathname);
    }
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    this.history?.pushState({}, '', pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history?.back()
  }

  forward() {
    this.history?.forward()
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname))
  }
}

export default new Router('#app')
