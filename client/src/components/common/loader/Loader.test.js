import React from 'react';
import Loader from './Loader';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loader = renderer.create(<Loader />).toJSON();

  expect(loader).toMatchSnapshot();
});
