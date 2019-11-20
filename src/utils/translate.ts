import { TFunction } from "i18next";

/**
 * Arguments for translating using `i18next.t` function.
 *
 * Meant to be used in validation result.
 */
export interface TranslateData {
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
export function tData(key: string, options?: any): TranslateData {
  return { key, options };
}

/**
 * Translate validation result.
 *
 * Meant to be called in component render. The TFunction should be obtained
 * by `react-i18next` package.
 *
 * @param t Translate function from i18next
 * @param data Data to be translated
 * @returns formatted result
 */
export function trans(t: TFunction, data: TranslateData): string {
  return t(data.key, data.options);
}
