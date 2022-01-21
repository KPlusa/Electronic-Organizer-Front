import 'react-native';
import React from 'react';
import RenderService from '../src/components/render-service';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
describe('init', () => {
  test('Render Service renders correctly', () => {
    const mockedParams = {
      fullHeaderOptions: null,
      isFullHeaderOptionsSelected: false,
      selectedService: {},
      servicesList: {},
      getService: null,
      isLoading: false,
    };

    renderer.create(<RenderService {...mockedParams} />);
  });
});
