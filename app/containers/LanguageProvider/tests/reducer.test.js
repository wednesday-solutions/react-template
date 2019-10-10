import deepFreeze from 'deep-freeze'
import languageProviderReducer from '../reducer'
import { CHANGE_LOCALE } from '../constants'
import { DEFAULT_LOCALE } from '../../../i18n'

/* eslint-disable default-case, no-param-reassign */
describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {})).toEqual({
      locale: 'en'
    })
  })

  const stateBefore = {
    locale: DEFAULT_LOCALE
  }

  const action = {
    type: CHANGE_LOCALE,
    locale: 'de'
  }

  const stateAfter = {
    locale: 'de'
  }

  deepFreeze(stateBefore)
  deepFreeze(action)

  it('changes the locale', () => {
    expect(languageProviderReducer(stateBefore, action)).toEqual(stateAfter)
  })
})
