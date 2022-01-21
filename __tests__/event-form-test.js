import 'react-native';
import React from 'react';
import EventForm from '../src/components/event-form';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('init', () => {
  test('Event form redners correctly', async () => {
    const mockedParams = {
      visibleEventForm: false,
      toogleEventForm: {},
      item: {},
      onlyAddHeaderOption: {},
      formType: 'add',
      currentDate: '2020-01-01T00:00:00',
    };

    renderer.create(<EventForm {...mockedParams} />);
  });
});
