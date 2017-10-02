/**
 * Mocked translate function for i18next.t
 * Used in testing only.
 */
export function trans(key: string, options: any) {
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
