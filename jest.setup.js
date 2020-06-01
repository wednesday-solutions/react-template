jest.mock('react-router-dom', () => ({
  __esModule: true,
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
    location: {
      pathname: '/',
      search: '',
      hash: ''
    }
  })
}));

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn(() => {
    return {
      matches: true,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  })
});
