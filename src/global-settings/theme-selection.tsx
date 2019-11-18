import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import { Dropdown } from "../material/dropdown";
import { selectedThemeSelector } from "../theme/selectors/selected-theme";
import { isDarkThemeSelector } from "../theme/selectors/is-dark-theme";
import { setThemeAction } from "../theme/actions/set-theme";
import { toggleDarkAction } from "../theme/actions/toggle-dark";
import { themes } from "../theme/color-presets";
import { RootState, Dispatch } from "../types";

const mapStateToProps = (state: RootState) => ({
  selectedTheme: selectedThemeSelector(state),
  dark: isDarkThemeSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setTheme: setThemeAction,
      toggleDark: toggleDarkAction
    },
    dispatch
  );

type stateType = ReturnType<typeof mapStateToProps>;
type dispatchType = ReturnType<typeof mapDispatchToProps>;

type ThemeSelectionProps = stateType & dispatchType;

export function ThemeSelectionImpl({
  selectedTheme,
  dark,
  setTheme,
  toggleDark
}: ThemeSelectionProps) {
  const { t } = useTranslation();
  const source = Array.from(themes.keys()).map(theme => ({
    value: theme,
    label: t(theme)
  }));

  return (
    <>
      <Dropdown
        label={t("Change theme")}
        source={source}
        value={selectedTheme}
        onChange={setTheme}
      />
      <FormGroup>
        <FormControlLabel
          label={t("Use dark theme")}
          control={
            <Switch checked={dark} onChange={toggleDark} color="primary" />
          }
        />
      </FormGroup>
    </>
  );
}

export const ThemeSelection = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeSelectionImpl);
