import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { showToastAction } from "../toast-singleton/actions/show-toast";
import { useAction } from "../hooks/use-action";
import { register } from "./serviceWorker";

export function SWReg() {
  const { t } = useTranslation();
  const showToast = useAction(showToastAction);

  useEffect(() => {
    register({
      onUpdate() {
        showToast(t("App will update after page reload"));
      },
      onSuccess() {
        showToast(t("This app is now available offline"));
      }
    });
    // Only run this effect once only. Regardless of dep t and showToast
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
