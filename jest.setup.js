import '@testing-library/jest-dom';
import { enableMocks } from 'jest-fetch-mock';

// jest.setup.js
enableMocks();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useLocation: jest.fn().mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa'
    }),
    useHistory: jest.fn().mockReturnValue({
      length: 2,
      action: 'POP',
      push: jest.fn(),
      location: {
        pathname: '/',
        search: '',
        hash: ''
      }
    })
  };
});
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => {
    return {
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  })
});

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: (props) => props.children
}));

jest.mock('redux-persist', () => ({
  ...jest.requireActual('redux-persist'),
  persistReducer: jest.fn().mockImplementation((config, reducer) => reducer)
}));

// Mock window.scrollTo to prevent jsdom "Not implemented" errors
if (!window.scrollTo) {
  Object.defineProperty(window, 'scrollTo', {
    value: jest.fn(),
    writable: true
  });
}

// Mock window.location.reload to prevent jsdom "Not implemented" errors
if (!window.location.reload) {
  Object.defineProperty(window.location, 'reload', {
    value: jest.fn(),
    writable: true
  });
}

// Polyfill for React 19 compatibility - ReactDOM.unmountComponentAtNode was removed
import ReactDOM from 'react-dom';
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
