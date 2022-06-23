import { selectItunesContainer, selectSomePayLoad } from '../selectors';

describe('ItunesContainer selector tests', () => {
  const mockedState = {
    itunesContainer: {
      somePayLoad: 'W.S'
    }
  };

  it('should select the itunesContainer state', () => {
    const itunesContainerSelector = selectItunesContainer();
    expect(itunesContainerSelector(mockedState)).toEqual(mockedState.itunesContainer);
  });

  it('should select the somePayLoad state', () => {
    const somePayLoadSelector = selectSomePayLoad();
    expect(somePayLoadSelector(mockedState)).toEqual(mockedState.itunesContainer.somePayLoad);
  });
});
