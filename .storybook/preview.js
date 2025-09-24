import React from 'react';
import ReactDOM from 'react-dom';
import enMessages from '../app/translations/en.json';

// React 19 compatibility shim for unmountComponentAtNode
if (!ReactDOM.unmountComponentAtNode) {
  ReactDOM.unmountComponentAtNode = (container) => {
    if (container._reactRootContainer) {
      container._reactRootContainer.unmount();
      delete container._reactRootContainer;
      return true;
    }
    return false;
  };
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  lingui: [{ id: 'en', name: 'English', messages: enMessages }]
};
