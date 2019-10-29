import { makeSelectLocation } from 'containers/App/selectors';

describe('App selector tests', () => {
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' }
    };
    const mockedState = {
      router
    };
    expect(makeSelectLocation()(mockedState)).toEqual(router.location);
  });
});
