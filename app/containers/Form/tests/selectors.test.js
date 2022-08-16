import { selectForm, selectSomePayLoad } from '../selectors';

describe('Form selector tests', () => {
  const mockedState = {
    form: {
      somePayLoad: 'W.S'
    }
  };

  it('should select the form state', () => {
    const formSelector = selectForm();
    expect(formSelector(mockedState)).toEqual(mockedState.form);
  });

  it('should select the somePayLoad state', () => {
    const somePayLoadSelector = selectSomePayLoad();
    expect(somePayLoadSelector(mockedState)).toEqual(mockedState.form.somePayLoad);
  });
});
