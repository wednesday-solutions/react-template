module.exports = function (plop) {
  // controller generator
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [],
    actions: [
      {
        type: 'modify',
        path: '../utils.js',
        pattern: / isProd\(\) \? '\/react-template\/' : '\/';/gm,
        template: ` '/';`
      },
      {
        type: 'modify',
        path: '../../app/utils/history.js',
        pattern: /createBrowserHistory\({ basename: getBaseName\(\) }\)/gm,
        template: 'createBrowserHistory()'
      },
      {
        type: 'modify',
        path: '../webpack/webpack.config.prod.js',
        pattern: /isProd\(\) \|\| isUAT\(\)/gm,
        template: 'false'
      }
    ]
  });
};
