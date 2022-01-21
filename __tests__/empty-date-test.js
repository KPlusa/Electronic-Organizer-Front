import 'react-native';
import React from 'react';
import EmptyDate from '../src/components/empty-date';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('init', () => {
  test('Empty Date redners correctly', async () => {
    renderer.create(<EmptyDate />);
  });
});
