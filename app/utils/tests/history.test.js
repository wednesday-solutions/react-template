import { findCommonRoutePrefix, getBaseUrl } from '../history';

jest.mock('../routeConstants', () => ({
  repos: {
    route: '/repos',
    exact: true
  },
  track: {
    route: '/tracks/:trackId',
    exact: true
  },
  trackGrid: {
    route: '/',
    exact: true
  }
}));

describe('history tests', () => {
  beforeEach(() => {
    process.env.ENVIRONMENT_NAME = 'uat';
  });

  it("should return getBaseUrl '/' if process.env.ENVIRONMENT_NAME is undefined", () => {
    process.env.ENVIRONMENT_NAME = undefined;
    const pathname = '/tracks/321';
    expect(getBaseUrl(pathname)).toBe('');
  });

  it("should return baseURL '/test-relative-path' if process.env.ENVIRONMENT_NAME is 'uat' ", () => {
    const pathname = '/test-relative-path';
    expect(getBaseUrl(pathname)).toBe(pathname);
  });

  it('should return baseURL /test-relative-path if pathname is /test-relatvie-path/repos', () => {
    const pathname = '/test-relative-path/repos';
    expect(getBaseUrl(pathname)).toBe('/test-relative-path');
  });

  it('should return baseURL /test-relative-path if pathname is /test-relatvie-path/repos/', () => {
    const pathname = '/test-relative-path/repos/';
    expect(getBaseUrl(pathname)).toBe('/test-relative-path');
  });

  it('should reutnr baseURL /test-relative-path if pathname is /test-relative-path/tracks/123', () => {
    const pathname = '/test-relative-path/tracks/123';
    expect(getBaseUrl(pathname)).toBe('/test-relative-path');
  });

  it('should return baseURL same as if pathname is /test-relative-path/tracks/123/tracks', () => {
    const pathname = '/test-relative-path/tracks/123/tracks';
    expect(getBaseUrl(pathname)).toBe('/test-relative-path/tracks/123/tracks');
  });

  it('should get the common prefix if passed in arrays of string in findCommonRoutePrefix', () => {
    const routeArr = [
      '/feat/auth/artist/jarvis/tracks',
      '/feat/auth/artist',
      '/feat/auth/artist/jarvis',
      '/feat/auth/art1st'
    ];
    expect(findCommonRoutePrefix(routeArr)).toBe('/feat/auth/art');
  });

  it('should return baseUrl /react-template if ENVINRONMENT_NAME is production', () => {
    process.env.ENVIRONMENT_NAME = 'production';
    const pathname = '/test-relative-path';
    expect(getBaseUrl(pathname)).toBe('/react-template');
  });
});
