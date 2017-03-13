export interface IBaseValidateResult {
  ok: boolean
  err: any
}

export function isOk(errors: any) {
  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      const error = errors[key]
      if (error !== '') {
        return false
      }
    }
  }
  return true
}
