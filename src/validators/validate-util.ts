export interface BaseValidateResult {
  ok: boolean;
  err: any;
}

export function isOk(errors: any) {
  for (let key in errors) {
    if (errors.hasOwnProperty(key)) {
      const error = errors[key];
      if (error !== '') {
        return false;
      }
    }
  }
  return true;
}
