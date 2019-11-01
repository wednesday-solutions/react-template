/*
 *
 * LanguageProvider reducer
 *
 */
import { createActions } from 'reduxsauce';
import { fromJS } from 'immutable';
import produce from 'immer';
import { DEFAULT_LOCALE } from '@app/i18n';

export const {
  Types: languageProviderTypes,
  Creators: languageProviderActions
} = createActions({
  changeLocale: ['locale']
});

export const initialState = fromJS({
  locale: DEFAULT_LOCALE
});

/* eslint-disable default-case, no-param-reassign */
export const languageProviderReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case languageProviderTypes.CHANGE_LOCALE:
        return state.set('locale', action.locale);
      default:
        return state;
    }
  });

export default languageProviderReducer;
