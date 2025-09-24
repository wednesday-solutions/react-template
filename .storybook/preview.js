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

// Polyfill for React 19 compatibility - ReactDOM.render was removed
if (!ReactDOM.render) {
  // Import createRoot from react-dom/client (React 18+ API)
  const { createRoot } = require('react-dom/client');
  
  ReactDOM.render = (element, container, callback) => {
    try {
      // Check if we already have a root for this container
      if (!container._reactRoot) {
        container._reactRoot = createRoot(container);
      }
      
      // Render the element
      container._reactRoot.render(element);
      
      // Call the callback if provided (legacy behavior)
      if (callback) {
        // Use setTimeout to match legacy ReactDOM.render callback timing
        setTimeout(callback, 0);
      }
      
      return container._reactRoot;
    } catch (error) {
      console.warn('Failed to render component:', error);
      return null;
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
