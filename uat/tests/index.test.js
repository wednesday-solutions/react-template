import { redirect } from '../index';

describe('UAT script tests', () => {
  let oldLocation;
  let oldFetch;

  beforeAll(() => {
    oldLocation = window.location;
    oldFetch = global.fetch;
    delete window.location;
    window.location = {
      pathname: '/',
      origin: 'http://localhost',
      replace: jest.fn()
    };
    delete global.fetch;
    global.fetch = jest.fn((url) => {
      let pathname = url.replace(window.location.origin, '');
      if (pathname === '/feat/spa') {
        return Promise.resolve({ ok: true });
      }
      return Promise.resolve({ ok: false });
    });
  });

  afterAll(() => {
    window.location = oldLocation;
    global.fetch = oldFetch;
  });

  it('should redirect to spa page', async () => {
    window.location.pathname = '/feat/spa/random/123';
    await redirect();
    expect(window.location.replace).toBeCalledWith(
      window.location.origin + '/feat/spa/index.html?redirect_uri=/random/123'
    );
  });

  it("should not redirect if pathname is '/'", async () => {
    window.location.pathname = '/';
    await redirect();
    expect(window.location.pathname).toBe('/');
  });

  it("should not redirect if pathname is ''", async () => {
    window.location.pathname = '';
    await redirect();
    expect(window.location.pathname).toBe('');
  });
  it("should not redirect if pathname is '/index.html'", async () => {
    window.location.pathname = '/index.html';
    await redirect();
    expect(window.location.pathname).toBe('/index.html');
  });

  it("should redirect back to index.html if path couldn't spa file in other route", async () => {
    window.location.pathname = '/some/random/place';
    await redirect();
    expect(window.location.replace).toBeCalledWith(window.location.origin + '/index.html');
  });

  it("should trim /index.html at the end redirect back to index.html if path couldn't spa file in other route", async () => {
    window.location.pathname = '/some/random/place/index.html';
    await redirect();
    expect(window.location.replace).toBeCalledWith(window.location.origin + '/index.html');
  });
});
