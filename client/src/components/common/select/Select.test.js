import React from 'react';
import Select from './Select';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const select = renderer.create(<Select />).toJSON();

  expect(select).toMatchSnapshot();
});
