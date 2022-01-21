import 'react-native';
import React from 'react';
import Calendar from '../src/scenes/calendar-scene';
import {useHeaderHeight} from '@react-navigation/elements';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('init', () => {
  test('Calendar Scene renders correctly', async () => {
    const mockedParams = {
      navigation: {
        navigate: jest.fn(),
        setOptions: jest.fn(),
        addListener: jest.fn(),
      },
    };

    renderer.create(<Calendar {...mockedParams} />);
  });
});
