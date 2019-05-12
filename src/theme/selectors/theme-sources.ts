import i18next from "i18next";
import { themes } from "../color-presets";
import { IDropdownSource } from "../../material/dropdown";

/**
 * Available themes in dropdown source form.
 *
 * NOTE: This selector is not a usual selector. It does not require `state` argument
 * but a translate function argument.
 */
export function themeSourcesSelector(
  t: i18next.TFunction
): Array<IDropdownSource<string>> {
  return Array.from(themes.keys()).map(theme => ({
    value: theme,
    label: t(theme)
  }));
}
