import React from 'react';
import Select from './components/Select.react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const select = renderer.create(<Select />).toJSON();

  expect(select).toMatchSnapshot();
});
