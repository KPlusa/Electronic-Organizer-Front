export function passwordValidator(password, password2) {
  if (!password) return 'Password is required.';
  if (password.length < 6)
    return 'Password must be at least 6 characters long.';
  if (typeof password2 !== 'undefined') {
    if (password !== password2 && password2) return 'Passwords differ';
  }
  return '';
}

export function confirmValidator(password, password2) {
  if (typeof password2 !== 'undefined') {
    if (!password2) return 'Password confirmation is required.';
    if (password !== password2 && password) return 'Passwords differ';
  }
  return '';
}
