import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import enMessages from '../app/translations/en.json';

// React 19 compatibility: Patch missing ReactDOM methods
if (!ReactDOM.unmountComponentAtNode) {
  ReactDOM.unmountComponentAtNode = function(container) {
    if (container && container._reactInternalInstance) {
      // For older React versions compatibility
      container._reactInternalInstance.unmount();
      delete container._reactInternalInstance;
      return true;
    }
    
    if (container && container._reactRootContainer) {
      container._reactRootContainer.unmount();
      delete container._reactRootContainer;
      return true;
    }
    
    // Fallback: clean the container
    if (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      return true;
    }
    
    return false;
  };
}

if (!ReactDOM.render) {
  ReactDOM.render = function(element, container, callback) {
    let root = container._reactRootContainer;
    if (!root) {
      root = container._reactRootContainer = createRoot(container);
    }
    
    root.render(element);
    
    if (callback) {
      setTimeout(callback, 0);
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
