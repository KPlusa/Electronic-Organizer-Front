import 'react-native';
import React from 'react';
import {
  StartTimeValidator,
  EndTimeValidator,
} from '../src/helpers/date-validator';
it('When time is empty', () => {
  expect(StartTimeValidator(null)).toBe('Start Time is required.');
  expect(EndTimeValidator(null)).toBe('End Time is required.');
});
it('When time is <8 and >16', () => {
  expect(StartTimeValidator('07:00')).toBe('Working hours are 8-16.');
  expect(StartTimeValidator('16:01')).toBe('Working hours are 8-16.');
  expect(EndTimeValidator('06:00', '07:00')).toBe('Working hours are 8-16.');
  expect(EndTimeValidator('15:00', '16:01')).toBe('Working hours are 8-16.');
});
it('When time is valid', () => {
  expect(StartTimeValidator('08:00')).toBe('');
  expect(StartTimeValidator('15:00')).toBe('');
  expect(EndTimeValidator('08:00', '09:00')).toBe('');
});
it('When time is invalid', () => {
  expect(StartTimeValidator('adwa')).toBe('Invalid Time Format.');
  expect(EndTimeValidator('10:00','1:1')).toBe('Invalid Time Format.');
});
it('When StartTime >= EndTime', () => {
  expect(StartTimeValidator('08:00', '08:00')).toBe(
    'Start Time should be less than End Time.',
  );
  expect(StartTimeValidator('09:00', '08:30')).toBe(
    'Start Time should be less than End Time.',
  );
  expect(EndTimeValidator('08:00', '08:00')).toBe(
    'End Time should be greater than Start Time.',
  );
  expect(EndTimeValidator('09:00', '08:30')).toBe(
    'End Time should be greater than Start Time.',
  );
});
