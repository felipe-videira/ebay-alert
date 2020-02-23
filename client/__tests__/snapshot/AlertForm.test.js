import React from 'react';
import renderer from 'react-test-renderer';
import mock from '../../__mocks__/data/alertForm';
import Form from '../../src/components/AlertForm/components/Form';

describe('AlertForm snapshot tests', () => {
  it('renders correctly on default values', () => {
    expect(renderer.create(
      <Form />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly with params', () => {
    expect(renderer.create(
      <Form
        params={mock.formParams}
      />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly with frequencies', () => {
    expect(renderer.create(
      <Form
        params={mock.formParams}
        frequencies={mock.frequencies} 
      />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on loading', () => {
    expect(renderer.create(
      <Form
        loading
        params={mock.formParams}
        frequencies={mock.frequencies} 
      />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on submit loading', () => {
    expect(renderer.create(
      <Form
        loadingSubmit
        params={mock.formParams}
        frequencies={mock.frequencies} 
      />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on delete allowed', () => {
    expect(renderer.create(
      <Form
        deleteAllowed
        params={mock.formParams}
        frequencies={mock.frequencies} 
      />
    ).toJSON())
    .toMatchSnapshot();
  });
})
