export function confirmValidator(password, password2) {
  if ( !password2) return "Password is required."
    if (password!==password2) return "Passwords differ"
  return ''
}