const path = require('path')
const genBaseConfig = require('../internals/webpack/webpack.base.babel.js')
module.exports = ({ config }) => {
  // hack cause smart knobs is not working on production
  process.env.NODE_ENV = 'development'

  const defaultConfig = genBaseConfig(config)
  config.resolve.modules.push('app')
  config.resolve.alias = defaultConfig.resolve.alias
  config.resolve.extensions.push('.js', '.jsx', '.react.js')
  return config
};