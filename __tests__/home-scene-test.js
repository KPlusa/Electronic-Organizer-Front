import 'react-native';
import React from 'react';
import Home from '../src/scenes/home-scene';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
describe('init', () => {
  test('Home Screen renders correctly', () => {
    const mockedParams = {
      navigation: jest.fn(),
    };
    renderer.create(<Home navigation={jest.fn()} />)
  });
});
