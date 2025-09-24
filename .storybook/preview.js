import enMessages from '../app/translations/en.json';

// Prevent jsdom "Not implemented: window.scrollTo" errors in Storybook & test-runner
if (typeof window !== 'undefined') {
  if (!window.scrollTo) {
    window.scrollTo = () => {};
  }
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
