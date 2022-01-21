import {
  PasswordValidator,
  ConfirmValidator,
  OldPasswordValidator,
} from '../src/helpers/password-validator';
it('Not Existence of passwords', () => {
  expect(PasswordValidator(null)).toBe('Password is required.');
  expect(ConfirmValidator(null, null)).toBe(
    'Password confirmation is required.',
  );
  expect(OldPasswordValidator('undefined')).toBe('Old Password is required.');
});

it('Password length > 5', () => {
  expect(PasswordValidator('12345')).toBe('');
  expect(PasswordValidator('1234')).toBe(
    'Password must be at least 5 characters long.',
  );
});

it('Password and Confirm Password are same', () => {
  expect(PasswordValidator('12345', '12345')).toBe('');
  expect(PasswordValidator('12345', '123456')).toBe('Passwords differ.');
  expect(ConfirmValidator('12345', '12345')).toBe('');
  expect(ConfirmValidator('12345', '123456')).toBe('Passwords differ.');
});
