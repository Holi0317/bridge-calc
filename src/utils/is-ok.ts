/**
 * Test if there is error in the error object.
 * If no error, true will be returned. Vice versa for error object with error.
 * Meant to be used with validator.
 * @param error - Error object to be tested
 */
export function isOk(error: any): boolean {
  return JSON.stringify(error) === '{}'
}
