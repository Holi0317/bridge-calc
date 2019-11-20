import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../material/dropdown";
import { selectedThemeSelector } from "../theme/selectors/selected-theme";
import { isDarkThemeSelector } from "../theme/selectors/is-dark-theme";
import { setThemeAction } from "../theme/actions/set-theme";
import { toggleDarkAction } from "../theme/actions/toggle-dark";
import { themes } from "../theme/color-presets";
import { FormControlLabel, Switch, FormGroup } from "@material-ui/core";
import { useAction } from "../hooks/use-action";

export function ThemeSelection() {
  const { t } = useTranslation();

  const selectedTheme = useSelector(selectedThemeSelector);
  const dark = useSelector(isDarkThemeSelector);

  const setTheme = useAction(setThemeAction);
  const toggleDark = useAction(toggleDarkAction);

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
