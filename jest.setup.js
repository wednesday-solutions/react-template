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
