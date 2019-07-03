import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { connect } from "react-redux";
import { WithTranslation, withTranslation } from "react-i18next";
import { bindActionCreators } from "redux";
import { showToastAction } from "../toast-singleton/actions/show-toast";
import { Dispatch } from "../types";

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      showToast: showToastAction
    },
    dispatch
  );

type dispatchType = ReturnType<typeof mapDispatchToProps>;

type SWRegProps = dispatchType & WithTranslation;

class SWRegImpl extends React.Component<SWRegProps> {
  public componentDidMount() {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      this.install();
    }
  }

  public render() {
    return null;
  }

  private async install() {
    try {
      const scriptURL = (document.baseURI || "/") + "sw.js";
      const registration = await navigator.serviceWorker.register(scriptURL);
      if (!registration) {
        // WTF no registration????
        return;
      }

      // New installation notify logic
      const sw = registration.installing || registration.waiting;
      if (sw) {
        sw.addEventListener("statechange", () => {
          if (sw.state === "activated") {
            this.showToast("This app is now available offline");
          }
        });
      }

      // Update notification logic
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed") {
              this.showToast("App will update after page reload");
            }
          });
        }
      });
    } catch (err) {
      console.error("Error when registering service worker", err);
    }
  }

  private showToast = (msg: string) => {
    const { showToast, t } = this.props;
    showToast(t(msg));
  };
}

export const SWReg = flowRight(
  withTranslation(),
  connect(
    null,
    mapDispatchToProps
  )
)(SWRegImpl);
