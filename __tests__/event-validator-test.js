import {EventValidator} from '../src/helpers/event-validator';
it('Existence of event', () => {
  expect(EventValidator(null)).toBe('Event is required.');
  expect(EventValidator('sample event')).toBe('');
});
