import { selectFrontendContainer, selectDashData, selectDashError, selectDashName } from '../selectors';

describe('FrontendContainer selector tests', () => {
  let mockedState;
  let dashName;
  let dashData;
  let dashError;
  beforeEach(() => {
    dashName = 'Phoenix';
    dashData = { name: 'Phoenix' };
    dashError = 'There was some error while fetching the city details';

    mockedState = {
      frontendContainer: {
        dashName,
        dashData,
        dashError
      }
    };
  });

  it('should select the frontendContainer state', () => {
    const frontendContainerSelector = selectFrontendContainer();
    expect(frontendContainerSelector(mockedState)).toEqual(mockedState.frontendContainer);
  });
  it('should select the dashName', () => {
    const dashSelector = selectDashName();
    expect(dashSelector(mockedState)).toEqual(dashName);
  });

  it('should select dashData', () => {
    const dashDataSelector = selectDashData();
    expect(dashDataSelector(mockedState)).toEqual(dashData);
  });

  it('should select the dashError', () => {
    const dashErrorSelector = selectDashError();
    expect(dashErrorSelector(mockedState)).toEqual(dashError);
  });
});
