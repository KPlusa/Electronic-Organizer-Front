import {
  TitleValidator,
  TimeValidator,
  CodeValidator,
} from '../src/helpers/service-validator';
it('Existence of services data', () => {
  expect(TitleValidator(null)).toBe('Title is required.');
  expect(TimeValidator(null)).toBe('Estimated time is required.');
  expect(CodeValidator(null)).toBe('Code is required.');
  expect(TitleValidator(!null)).toBe('');
});
it('Correctess of estimated time', () => {
  expect(TimeValidator('string')).toBe('Estimated time must be an integer.');
  expect(TimeValidator(9)).toBe('Wrong estimated time. It must be between 10 and 180 minutes.');
  expect(TimeValidator(181)).toBe(
    'Wrong estimated time. It must be between 10 and 180 minutes.',
  );
  expect(TimeValidator(30)).toBe('');
});
it('Correctess of code', () => {
  expect(CodeValidator('123Sa')).toBe('Code must be 6 characters long.');
  expect(CodeValidator('SER006')).toBe('');
});
