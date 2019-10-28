import * as React from "react";
import flowRight from "lodash-es/flowRight";
import { bindActionCreators } from "redux";
import i18next from "i18next";
import { connect } from "react-redux";
import { WithTranslation, withTranslation } from "react-i18next";
import { Dropdown, DropdownSource } from "../material/dropdown";
import { showToastAction } from "../toast-singleton/actions/show-toast";
import { languages } from "../app/languages";
import { Dispatch } from "../types";

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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      showToast: showToastAction
    },
    dispatch
  );

type dispatchType = ReturnType<typeof mapDispatchToProps>;
type LanguageSelectorProps = dispatchType & WithTranslation;

export class LanguageSelectorImpl extends React.Component<
  LanguageSelectorProps
> {
  public render() {
    const { i18n, t } = this.props;

    return (
      <div>
        <Dropdown
          label={t("Change language")}
          value={i18n.language}
          source={transformLanguageArray(t)}
          onChange={this.changeLanguage}
        />
      </div>
    );
  }

  private changeLanguage = async (lang: string) => {
    const { i18n } = this.props;
    let err = null;

    try {
      await i18n.changeLanguage(lang);
    } catch (e) {
      err = e;
    }

    const { t, showToast } = this.props;
    const message =
      err == null
        ? t("Changed language successfully")
        : t("Error when changing language. Error: {{err}}", {
            err: err.message
          });
    showToast(message);
  };
}

export const LanguageSelector = flowRight(
  withTranslation(),
  connect(
    null,
    mapDispatchToProps
  )
)(LanguageSelectorImpl);
