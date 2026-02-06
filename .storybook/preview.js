import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import enMessages from '../app/translations/en.json';

// Polyfill for React 18/19 compatibility with Storybook 6.x
// Storybook 6.x uses the deprecated render and unmountComponentAtNode APIs

// Store roots for cleanup
const rootsMap = new WeakMap();

if (!ReactDOM.render) {
  ReactDOM.render = (element, container, callback) => {
    let root = rootsMap.get(container);
    if (!root) {
      root = createRoot(container);
      rootsMap.set(container, root);
    }
    flushSync(() => {
      root.render(element);
    });
    if (callback) {
      callback();
    }
    return {
      unmount: () => root.unmount()
    };
  };
}

if (!ReactDOM.unmountComponentAtNode) {
  ReactDOM.unmountComponentAtNode = (container) => {
    const root = rootsMap.get(container);
    if (root) {
      root.unmount();
      rootsMap.delete(container);
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
