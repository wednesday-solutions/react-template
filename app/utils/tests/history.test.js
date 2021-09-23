import { baseUrl } from '../history';

describe('Tests for baseUrl method in history', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });
  it('should the path /react-template in production', () => {
    process.env.NODE_ENV = 'production';
    expect(baseUrl()).toEqual('/react-template');
  });

  it('should the path /react-template in development or test mode', () => {
    expect(baseUrl()).toEqual('/');
  });
});
