import { getCurrentRouteDetails, isLocal } from '@utils/index';

describe('Tests for getCurrentRouteDetails method', () => {
  let location = {};
  it('should return null if pathname is not avialable', () => {
    expect(getCurrentRouteDetails(location)).toEqual(null);
  });
});

describe('Tests for isLocal method', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should return true if process.env.IS_LOCAL', () => {
    process.env.IS_LOCAL = true;
    expect(isLocal()).toBe(true);
  });
  it('should return false if process.env.IS_LOCAL is not available', () => {
    process.env.IS_LOCAL = false;
    expect(isLocal()).toBe(false);
  });
});
