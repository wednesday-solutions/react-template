// eslint-disable-next-line
import React from 'react';
import { useIntl } from 'react-intl';

// 'intl' service singleton reference
let intl;

export function IntlGlobalProvider({ children }) {
  intl = useIntl(); // Keep the 'intl' service reference
  return children;
}

// setter function to set intl value inside tests
export const setIntl = (intlValue) => {
  intl = intlValue;
};

export const translate = (id, values = {}) => intl.formatMessage({ id }, values);
