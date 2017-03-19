import {getLogger} from 'aurelia-logging'

const suffix = ['th', 'st', 'nd', 'rd']
const logger = getLogger('OrdinalFormatConverter')

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
  public toView(value: string) {
    if (isNaN(+value) || !Number.isInteger(+value)) {
      logger.warn('Received value that is not number or is a float. Value:', value)
      return value
    }
    const v = +value % 100
    return value + (suffix[(v - 20) % 10] || suffix[v] || suffix[0])
  }
}
