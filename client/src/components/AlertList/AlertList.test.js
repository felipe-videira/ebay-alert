import React from 'react';
import List from './components/List';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const list = renderer.create(<List />).toJSON();

  expect(list).toMatchSnapshot();
});
