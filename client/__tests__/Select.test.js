import React from 'react';
import Select from '../src/components/common/select/Select';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const select = renderer.create(<Select />).toJSON();

  expect(select).toMatchSnapshot();
});
