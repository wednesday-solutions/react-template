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
  const oldLocation = window.location;

  beforeEach(() => {
    jest.resetModules();
    delete window.location;
    window.location = {
      pathname: '/'
    };
    process.env = { ...OLD_ENV };
    process.env.ENVIRONMENT_NAME = 'development';
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env = OLD_ENV;
    window.location = oldLocation;
  });

  it("should return getBaseUrl '/' if process.env.NODE_ENV is development", () => {
    process.env.NODE_ENV = 'development';
    window.location.pathname = '/tracks/321';
    expect(getBaseUrl()).toBe('');
  });

  it('should return baseURL BRANCH_NAME in UAT environment', () => {
    process.env.BRANCH_NAME = '/feat/test-pr';
    window.location.pathname = '/feat/test-pr/tracks/123';
    expect(getBaseUrl()).toBe(process.env.BRANCH_NAME);
    process.env.BRANCH_NAME = undefined;
  });

  it('should return baseURL from pathname in UAT environment if BRANCH_NAME in undefined', () => {
    window.location.pathname = '/feat/test-pr/index.html';
    expect(getBaseUrl()).toBe('/feat/test-pr');
  });

  it('should return baseUrl /react-template if NODE_ENV and ENVIRONMENT_NAME is production', () => {
    process.env.ENVIRONMENT_NAME = 'production';
    window.location.pathname = '/test-relative-path';
    expect(getBaseUrl()).toBe('/react-template');
  });
});
