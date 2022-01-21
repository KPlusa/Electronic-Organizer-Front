import 'react-native';
import React from 'react';
import LoginScene from '../src/scenes/login-scene';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('init', () => {
  test('Login renders correctly', async () => {
    const mockedParams = {
      navigation: jest.fn(),
    };

    renderer.create(<LoginScene {...mockedParams} />);
  });
});
