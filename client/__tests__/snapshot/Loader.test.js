import React from 'react';
import renderer from 'react-test-renderer';
import Loader, { LOADER_SIZE } from '../../src/components/common/loader/Loader';

describe('Loader snapshot tests', () => {
  it('renders correctly on default values', () => {
    expect(renderer.create(
      <Loader />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on small size', () => {
    expect(renderer.create(
      <Loader size={LOADER_SIZE.SMALL} />
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on normal size', () => {
    expect(renderer.create(
      <Loader size={LOADER_SIZE.NORMAL}/>
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on large size', () => {
    expect(renderer.create(
      <Loader size={LOADER_SIZE.LARGE}/>
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on invisible mode', () => {
    expect(renderer.create(
      <Loader visible={false}/>
    ).toJSON())
    .toMatchSnapshot();
  });
  it('renders correctly on explicitly visible mode', () => {
    expect(renderer.create(
      <Loader visible />
    ).toJSON())
    .toMatchSnapshot();
  });
});

