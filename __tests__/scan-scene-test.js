import 'react-native';
import React from 'react';
import Scan from '../src/scenes/scan-scene';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
describe('init', () => {
  test('Scan Scene renders correctly', async () => {
    const mockedParams = {
      navigation: jest.fn(),
    };
    renderer.create(<Scan {...mockedParams} />);
  });
});
