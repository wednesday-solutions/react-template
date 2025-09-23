import '@testing-library/jest-dom';
import { enableMocks } from 'jest-fetch-mock';

// jest.setup.js
enableMocks();

// Polyfill for TextEncoder/TextDecoder in Node.js test environment
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  /* eslint-disable immutable/no-mutation */
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
  /* eslint-enable immutable/no-mutation */
}

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
    useNavigate: jest.fn().mockReturnValue(jest.fn())
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
