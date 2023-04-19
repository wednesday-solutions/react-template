module.exports = {
  stories: ['../app/**/*.stories.mdx', '../app/**/*.stories.@(js|jsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@bumped-inc/storybook-addon-lingui-v3',
    '@storybook/addon-a11y'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  }
};
