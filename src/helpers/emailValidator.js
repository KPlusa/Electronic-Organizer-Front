export function emailValidator(email) {
  const mail_checker = /\S+@\S+\.\S+/
  if (!email) return "Email is required."
  if (!mail_checker.test(email)) return 'Email is incorrect.'
  return ''
}