import { getCurrentRouteDetails, isLocal } from '@utils/index';
import routeConstants from '@utils/routeConstants';

describe('Tests for getCurrentRouteDetails method', () => {
  let location = {};
  it('should return null if pathname is not available', () => {
    expect(getCurrentRouteDetails(location)).toEqual(null);
  });

  it('should return the details of the route', () => {
    let location = { pathname: '/' };
    expect(getCurrentRouteDetails(location)).toEqual(routeConstants['repos']);
  });

  it('should return null of the route if pathname is not in routeConstants', () => {
    let location = { pathname: '/repos' };
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

  it('should return true if process.env.IS_LOCAL is true', () => {
    process.env.IS_LOCAL = true;
    expect(isLocal()).toBe(true);
  });
  it('should return false if when process.env.IS_LOCAL is not present', () => {
    expect(isLocal()).toBe(false);
  });
});
