module.exports = {
  stories: ['../app/**/*.stories.mdx', '../app/**/*.stories.@(js|jsx)'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@bumped-inc/storybook-addon-lingui-v3',
    '@storybook/addon-a11y'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  docs: {
    autodocs: true
  },

  core: {
    builder: '@storybook/builder-webpack5'
  }
};
