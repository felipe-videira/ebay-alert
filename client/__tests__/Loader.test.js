import React from 'react';
import Loader from '../src/components/common/loader/Loader';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loader = renderer.create(<Loader />).toJSON();

  expect(loader).toMatchSnapshot();
});
