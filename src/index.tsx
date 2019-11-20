import React, { Suspense } from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./theme/theme-provider";
import { PersistGate } from "redux-persist/integration/react";
import { httpsRedirect } from "./https-redirect";
import { Shell } from "./shell";
import "./app/i18n";
import { store, persistor } from "./app/redux-store";
import { ErrorBoundary } from "./error-boundary";
import { basenameProcess } from "./utils/basename-process";
import { Spinner } from "./material/spinner";

function Root() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter basename={basenameProcess(document.baseURI || "/")}>
            <Suspense fallback={<Spinner />}>
              <ErrorBoundary>
                <Shell />
              </ErrorBoundary>
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

if (httpsRedirect()) {
  ReactDOM.render(<Root />, document.querySelector(".root"));
}
