export const validate = (value: string, pattern: RegExp, msg: string) => (!pattern.test(value) ? msg : false)
