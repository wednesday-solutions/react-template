const path = require('path')
const genBaseConfig = require('../internals/webpack/webpack.base.babel.js')
module.exports = ({ config }) => {
  const defaultConfig = genBaseConfig(config)
  config.resolve.modules.push('app')
  config.resolve.alias = config.resolve.alias
  config.resolve.extensions.push('.js', '.jsx', '.react.js')

  config.module.rules.push(...defaultConfig.module.rules)
  return config
};
