import 'react-native';
import React from 'react';
import StartScene from '../src/scenes/start-scene';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
it('StartScene renders correctly', () => {
 renderer.create(<StartScene/>);
});
