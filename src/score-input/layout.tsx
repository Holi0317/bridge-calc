import * as React from "react";
import { Route, matchPath } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { routes } from "./routes";
import { useLocation, useHistory } from "react-router";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import { ErrorBoundary } from "../error-boundary";
import { useState, useEffect, useCallback } from "react";

function getActive(pathname: string): number {
  /*
   * Create a matches array.
   * If match, it will be marked as 1 in the array. null otherwise
   */
  const index = routes.findIndex(route => matchPath(pathname, route) != null);
  return index === -1 ? 0 : index;
}

/**
 * React hook for current active tab index.
 *
 * This hook will react to route change and update accordingly.
 *
 * The returns value is the currently activated index.
 */
function useTab(): number {
  const [active, setActive] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setActive(getActive(location.pathname));
  });

  const newActive = getActive(location.pathname);
  if (newActive != active) {
    setActive(newActive);
  }

  return active;
}

export function Layout() {
  const { t } = useTranslation();
  const history = useHistory();

  const active = useTab();

  const tabChange = useCallback(
    (_event: any, routeIndex: number) => {
      const { path } = routes[routeIndex];
      if (path != null) {
        history.push(path);
      }
    },
    [routes, history]
  );

  return (
    <div>
      <Paper>
        <Tabs
          value={active}
          onChange={tabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {routes.map((route, index) => (
            <Tab key={index} label={t(route.name)} value={index} />
          ))}
        </Tabs>
      </Paper>
      <ErrorBoundary>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}
      </ErrorBoundary>
    </div>
  );
}
