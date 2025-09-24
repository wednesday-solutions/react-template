const { injectAxe, checkA11y } = require('axe-playwright');

module.exports = {
  async preRender(page) {
    await injectAxe(page);
    // Add scrollTo mock and ReactDOM polyfill to prevent browser API errors
    await page.addInitScript(() => {
      if (!window.scrollTo) {
        window.scrollTo = () => {};
      }
      
      // Polyfill for React 19 compatibility - ReactDOM.unmountComponentAtNode was removed
      if (window.ReactDOM && !window.ReactDOM.unmountComponentAtNode) {
        window.ReactDOM.unmountComponentAtNode = (container) => {
          try {
            if (container._reactRoot) {
              container._reactRoot.unmount();
              delete container._reactRoot;
              return true;
            }
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
      if (window.ReactDOM && !window.ReactDOM.render) {
        window.ReactDOM.render = (element, container, callback) => {
          try {
            // Check if we already have a root for this container
            if (!container._reactRoot && window.ReactDOMClient && window.ReactDOMClient.createRoot) {
              container._reactRoot = window.ReactDOMClient.createRoot(container);
            }
            
            if (container._reactRoot) {
              // Render the element
              container._reactRoot.render(element);
              
              // Call the callback if provided (legacy behavior)
              if (callback) {
                setTimeout(callback, 0);
              }
              
              return container._reactRoot;
            } else {
              console.warn('createRoot not available, falling back to innerHTML');
              container.innerHTML = '';
              return null;
            }
          } catch (error) {
            console.warn('Failed to render component:', error);
            return null;
          }
        };
      }
    });
  },
  async postRender(page) {
    await checkA11y(page, '#root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    });
  }
};
