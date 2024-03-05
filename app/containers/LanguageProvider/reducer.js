/*
 *
 * LanguageProvider reducer
 *
 */
import { createActions } from 'reduxsauce';
import { produce } from 'immer';
import { DEFAULT_LOCALE } from '@app/i18n';

export const { Types: languageProviderTypes, Creators: languageProviderActions } = createActions({
  changeLocale: ['locale']
});

export const initialState = {
  locale: DEFAULT_LOCALE
};

export const languageProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    // the number of languages should and will increase.
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (action.type) {
      case languageProviderTypes.CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

export default languageProviderReducer;
