import 'react-native';
import React from 'react';
import SuccessfulOverlay from '../src/components/successful-overlay';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
it('SuccessfulOverlay renders correctly', () => {
 renderer.create(<SuccessfulOverlay/>);
});
