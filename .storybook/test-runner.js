const { injectAxe, checkA11y } = require('axe-playwright');

module.exports = {
  async preRender(page) {
    await injectAxe(page);
    // Add scrollTo mock to prevent browser API errors
    await page.addInitScript(() => {
      if (!window.scrollTo) {
        window.scrollTo = () => {};
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
