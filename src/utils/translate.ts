import i18next from "i18next";

/**
 * Mocked translate function for i18next.t
 * Used in testing only.
 *
 * @deprecated Use trans2 instead
 */
export function trans(key: string, options: any) {
  if (options == null) {
    return key;
  }
  let result = key;
  for (const k of Object.keys(options)) {
    const value = options[k];
    const template = `{{${k}}}`;
    result = result.replace(template, value);
  }
  return result;
}

/**
 * Arguments for translating using `i18next.t` function.
 *
 * Meant to be used in validation result.
 */
export interface ITranslateData {
  /**
   * Key of the translation.
   */
  key: string;

  /**
   * Optional options for the translation. Used for formatting.
   */
  options?: any;
}

/**
 * Convenient function for building ITranslateData.
 */
export function tData(key: string, options?: any): ITranslateData {
  return { key, options };
}

/**
 * Translate validation result.
 *
 * Meant to be called in component render. The TFunction should be obtained
 * by `react-i18next` package.
 *
 * TODO Rename this function to `trans` after migration is finished
 *
 * @param t Translate function from i18next
 * @param data Data to be translated
 * @returns formatted result
 */
export function trans2(t: i18next.TFunction, data: ITranslateData): string {
  return t(data.key, data.options);
}
