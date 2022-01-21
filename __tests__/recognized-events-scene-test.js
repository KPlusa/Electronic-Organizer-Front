import 'react-native';
import React from 'react';
import Events from '../src/scenes/recognized-events-scene.js';

import renderer from 'react-test-renderer';
describe('init', () => {
  test('Recognized events renders correctly', () => {
    const mockedParams = {
      route: {
        params: {
          recEvents: JSON.stringify([
            {
              Date: '2022-01-01T00:00:00',
              EndTime: '2022-01-01T12:30:00',
              Id: 0,
              Name: 'Coloring',
              StartTime: '2022-01-01T12:00:00',
            },
            {
              Date: '2022-01-01T00:00:00',
              EndTime: '2022-01-01T13:00:00',
              Id: 1,
              Name: 'Decolorization',
              StartTime: '2022-01-01T12:30:00',
            },
            {
              Date: '2022-01-01T00:00:00',
              EndTime: '2022-01-01T14:00:00',
              Id: 2,
              Name: 'Coloring',
              StartTime: '2022-01-01T13:30:00',
            },
          ]),
        },
      },
      navigation: {
        navigate: jest.fn(),
        setOptions: jest.fn(),
        addListener: jest.fn(),
      },
    };

    renderer.create(<Events {...mockedParams} />);
  });
});
