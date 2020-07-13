// eslint-disable-next-line
import React from 'react';
import { useIntl } from 'react-intl';

// 'intl' service singleton reference
let intl;

export function IntlGlobalProvider({ children }) {
  intl = useIntl(); // Keep the 'intl' service reference
  return children;
}

// Getter function to expose the read-only 'intl' service
export function appIntl() {
  return intl;
}

export const translate = (id, values = {}) => intl.formatMessage({ id }, values);
