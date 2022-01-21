import 'react-native';
import React from 'react';
import SetPassword from '../src/scenes/set-password-scene';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
describe('init', () => {
  test('Set Password Scene renders correctly', async () => {
    const mockedParams = {
      route: {
        params: false,
      },
      navigation: jest.fn(),
    };

    renderer.create(<SetPassword {...mockedParams} />);
  });
});
