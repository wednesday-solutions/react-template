import { fromJS } from 'immutable';
import { selectItunesAppContainerDomain } from '../selectors';

describe('ItunesAppContainer selector tests', () => {
  let mockedState;

  beforeEach(() => {
    mockedState = {
      itunesAppContainer: fromJS({
        showLoader: false,
        songsData: []
      })
    };
  });

  it('should select the itunesAppContainer state', () => {
    expect(selectItunesAppContainerDomain(mockedState)).toEqual(mockedState.itunesAppContainer.toJS());
  });
});
