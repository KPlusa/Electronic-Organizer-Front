import 'react-native';
import React from 'react';
import MainScene from '../src/scenes/main-scene';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(
      <MainScene />
  );
});
