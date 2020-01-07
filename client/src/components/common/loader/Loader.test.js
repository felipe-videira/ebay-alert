import React from 'react';
import Loader from './components/Loader.react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const loader = renderer.create(<Loader />).toJSON();

  expect(loader).toMatchSnapshot();
});
