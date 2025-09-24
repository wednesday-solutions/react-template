import enMessages from '../app/translations/en.json';
import ReactDOM from 'react-dom';

// Prevent jsdom "Not implemented: window.scrollTo" errors in Storybook & test-runner
if (typeof window !== 'undefined') {
  if (!window.scrollTo) {
    window.scrollTo = () => {};
  }
}

// Polyfill for React 19 compatibility - ReactDOM.unmountComponentAtNode was removed
if (!ReactDOM.unmountComponentAtNode) {
  ReactDOM.unmountComponentAtNode = (container) => {
    // In React 19, we need to use the new createRoot API
    // For Storybook compatibility, we'll try to unmount if there's a root
    try {
      if (container._reactRoot) {
        container._reactRoot.unmount();
        delete container._reactRoot;
        return true;
      }
      // Fallback: clear the container
      if (container) {
        container.innerHTML = '';
      }
      return true;
    } catch (error) {
      console.warn('Failed to unmount component:', error);
      return false;
    }
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
