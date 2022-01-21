import 'react-native';
import React from 'react';
import ProfileScene from '../src/scenes/profile-scene';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
describe('init', () => {
  test('Profile screen renders correctly', () => {
    const mockedParams = {
      navigation: '',
    };

    renderer.create(<ProfileScene navigation={''} />)
  });
});
// const navigation = { navigate: jest.fn() };
// it('renders correctly', async () => {
//  await renderer.create( <ProfileScene navigation={navigation}/>);
// });
