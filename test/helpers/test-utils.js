/**
 * Mocked translate function for i18next.t
 */
export function t(key, options) {
  if (options == null) {
    return key
  }
  let result = key
  for (const k of Object.keys(options)) {
    const value = options[k]
    const template = `{{${k}}}`
    result = result.replace(template, value)
  }
  return result
}
