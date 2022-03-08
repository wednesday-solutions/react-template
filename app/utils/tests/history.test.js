import { getBaseUrl } from '../history';

jest.mock('../routeConstants', () => ({
  home: {
    route: '/'
  },
  repos: {
    route: '/repos'
  },
  tracks: {
    route: '/tracks'
  },
  track: {
    route: '/tracks/:trackId'
  },
  artist: {
    route: '/artists/:artistId'
  },
  artistTrack: {
    route: '/artists/:artistId/tracks/:trackId'
  }
}));

describe('history tests', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    process.env.ENVIRONMENT_NAME = 'development';
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it("should return getBaseUrl '/' if process.env.NODE_ENV is development", () => {
    process.env.NODE_ENV = 'development';
    const pathname = '/tracks/321';
    expect(getBaseUrl(pathname)).toBe('');
  });

  it("should return baseURL '/test-relative-path' if process.env.ENVIRONMENT_NAME is 'development' ", () => {
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

  it('should return baseURL /test-relative-path/tracks/123 if pathname is /test-relative-path/tracks/123/tracks', () => {
    const pathname = '/test-relative-path/tracks/123/tracks';
    expect(getBaseUrl(pathname)).toBe('/test-relative-path/tracks/123');
  });

  it('should return baseURL /test-relative-path if pathname is /test-relative-path/artists/123/tracks/321', () => {
    const pathname = '/test-relative-path/artists/123/tracks/321';
    expect(getBaseUrl(pathname)).toBe('/test-relative-path');
  });

  it('should return baseURL /test-relative-path if pathname is /test-relative-path/artists/123/tracks/321/', () => {
    const pathname = '/test-relative-path/artists/123/tracks/321/';
    expect(getBaseUrl(pathname)).toBe('/test-relative-path');
  });

  it('should return baseURL same as pathname if pathname is /test-relative-path/artists/123/track2/321', () => {
    const pathname = '/test-relative-path/artists/123/track2/321';
    expect(pathname).toBe(pathname);
  });

  it('should return baseUrl /react-template if NODE_ENV and ENVIRONMENT_NAME is production', () => {
    process.env.ENVIRONMENT_NAME = 'production';
    const pathname = '/test-relative-path';
    expect(getBaseUrl(pathname)).toBe('/react-template');
  });
});
