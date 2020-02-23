import React from 'react';
import renderer from 'react-test-renderer';
import mock from '../../__mocks__/data/select';
import Select, { SELECT_SIZE } from '../../src/components/common/select/Select';

describe('Select snapshot tests', () => {
  it('renders correctly on default values', () => {
    expect(renderer.create(
      <Select />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly with items', () => {
    expect(renderer.create(
      <Select items={mock.items} />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly with value', () => {
    expect(renderer.create(
      <Select items={mock.items} value={mock.value}/>
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly with items and custom keys', () => {
    expect(renderer.create(
      <Select 
        items={mock.customKeysItems} 
        labelKey={mock.labelKey} 
        valueKey={mock.valueKey}
      />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly with placeholder', () => {
    expect(renderer.create(
      <Select placeholder={mock.placeholder} />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly with mobileListTitle', () => {
    expect(renderer.create(
      <Select mobileListTitle={mock.mobileListTitle} />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on small size', () => {
    expect(renderer.create(
      <Select size={SELECT_SIZE.SMALL} />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on normal size', () => {
    expect(renderer.create(
      <Select size={SELECT_SIZE.NORMAL} />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on large size', () => {
    expect(renderer.create(
      <Select size={SELECT_SIZE.LARGE} />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly when disabled', () => {
    expect(renderer.create(
      <Select disabled />
    ).toJSON())
    .toMatchSnapshot();
  });
});

