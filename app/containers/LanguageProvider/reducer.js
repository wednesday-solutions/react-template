/**
 *
 * @typedef LanguageProviderState
 * @type {object}
 * @property {string} locale - locale to be used for internationalization.
 */
import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LOCALE } from '@app/i18n';

/** @type {LanguageProviderState} */
export const initialState = {
  locale: DEFAULT_LOCALE
};

/**
 *
 * @abstract redux slice for LanguageProvider
 * @description creates a slice to be used as the LanguaeProvider.
 * Can be used for toggling languages on the client.
 *
 *
 **/

const languageProviderSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    /**
     * @abstract change the locale of the application
     */
    changeLocale(state, action) {
      state.locale = action.payload;
    }
  }
});

export const { changeLocale } = languageProviderSlice.actions;

export default languageProviderSlice.reducer;
