export class OrdinalFormatValueConverter {
  /**
   * Add ordinal suffix to given value.
   * @example
   * converter.toView('1')
   * // -> '1st'
   * converter.toView('4')
   * // -> '4th'
   * @param value - Number in string format to be converted
   * @returns {string} - Formatted string with ordinal suffix
   */
  toView(value: string) {
    let suffix = ["th","st","nd","rd"];
    let v = +value % 100;
    return value + (suffix[(v-20)%10]||suffix[v]||suffix[0]);
  }
}
