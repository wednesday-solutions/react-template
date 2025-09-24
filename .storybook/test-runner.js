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
