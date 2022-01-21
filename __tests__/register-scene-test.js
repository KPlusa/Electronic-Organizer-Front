import 'react-native';
import React from 'react';
import RegisterScene from '../src/scenes/register-scene';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('init', () => {
  test('Register Scene renders correctly', async () => {
    const mockedParams = {
      navigation: jest.fn(),
    };

    renderer.create(<RegisterScene {...mockedParams} />);
  });
});
