import 'react-native';
import React from 'react';
import Service from '../src/scenes/service-scene';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
describe('init', () => {
  test('Service scene renders correctly', () => {
    const mockedParams = {
      navigation: {
        navigate: jest.fn(),
        setOptions: jest.fn(),
        addListener: jest.fn(),
      },
    };

    renderer.create(<Service {...mockedParams} />);
  });
});
