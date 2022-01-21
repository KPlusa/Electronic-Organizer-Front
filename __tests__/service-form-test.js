import 'react-native';
import React from 'react';
import ServiceForm from '../src/components/service-form';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('init', () => {
  test('Service form redners correctly', async () => {
    const mockedParams = {
      visibleServiceForm: false,
      toogleServiceForm: {},
      service: {},
      onlyAddHeaderOption: null,
      getService: {},
      formType: 'add',
    };

    renderer.create(<ServiceForm {...mockedParams} />);
  });
});
