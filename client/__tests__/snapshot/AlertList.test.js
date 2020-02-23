import React from 'react';
import renderer from 'react-test-renderer';
import mock from '../../__mocks__/data/alertList';
import List from '../../src/components/AlertList/components/List';

describe('AlertList snapshot tests', () => {
  it('renders correctly on default values', () => {
    expect(renderer.create(
      <List />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly with data', () => {
    expect(renderer.create(
      <List data={mock.data} />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly with data and custom keys', () => {
    expect(renderer.create(
      <List 
        data={mock.dataWithCustomKeys}
        titleKey={mock.titleKey}
        descriptionKey={mock.descriptionKey}
        infoKey={mock.infoKey}
      />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on loading', () => {
    expect(renderer.create(
      <List loading />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on mobile mode', () => {
    expect(renderer.create(
      <List mobile />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly when has more to load', () => {
    expect(renderer.create(
      <List hasMoreToLoad />
    ).toJSON())
    .toMatchSnapshot();
  });
});
