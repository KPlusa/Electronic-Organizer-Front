export function TitleValidator(title) {
  if (!title) return 'Title is required.';
  return '';
}

export function TimeValidator(time) {
    if (!time) return 'Estimated time is required.';
    if (time>180 || time<10) return 'Wrong estimated time. It must be between 10 and 180 minutes.';
  return '';
}

export function CodeValidator(code) {
    if (!code) return 'Code is required.';
    if (code.length!==6) return 'Code must be 6 characters long.';
  return '';
}
