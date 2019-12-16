import React from 'react';
import Form from './components/Form.react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const form = renderer.create(<Form />).toJSON();

  expect(form).toMatchSnapshot();
});
