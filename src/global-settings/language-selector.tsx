import React from "react";
import { useCallback } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownSource } from "../material/dropdown";
import { showToastAction } from "../toast-singleton/actions/show-toast";
import { languages } from "../app/languages";
import { useAction } from "../hooks/use-action";
import { useRefT } from "../hooks/use-ref-t";

function transformLanguageArray(
  t: i18next.TFunction
): DropdownSource<string>[] {
  return (
    languages
      // Filter away 'cimode' pseudo language created by i18next
      .filter(lang => lang !== "cimode")
      .map(lang => ({
        value: lang,
        label: t(lang)
      }))
  );
}

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const showToast = useAction(showToastAction);
  const refT = useRefT();

  const changeLanguage = useCallback(
    async (lang: string) => {
      let err = null;

      try {
        await i18n.changeLanguage(lang);
      } catch (e) {
        err = e;
      }

      const message =
        err == null
          ? refT.current("Changed language successfully")
          : refT.current("Error when changing language. Error: {{err}}", {
              err: err.message
            });
      showToast(message);
    },
    [i18n, showToast, refT]
  );

  return (
    <div>
      <Dropdown
        label={t("Change language")}
        value={i18n.language}
        source={transformLanguageArray(t)}
        onChange={changeLanguage}
      />
    </div>
  );
}
