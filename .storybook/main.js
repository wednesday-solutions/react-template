module.exports = {
  stories: ['../app/**/*.stories.mdx', '../app/**/*.stories.@(js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-controls',
    'storybook-react-intl',
    '@storybook/addon-a11y'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  }
};
