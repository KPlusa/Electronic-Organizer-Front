import {EmailValidator} from '../src/helpers/email-validator';
it('Given correct email', () => {
  expect(EmailValidator('example@example.com')).toBe('');
});
it('Given incorrect email', () => {
  expect(EmailValidator('incorrect')).toBe('Email is incorrect.');
});