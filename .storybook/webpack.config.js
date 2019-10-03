const path = require('path')
const genBaseConfig = require('../internals/webpack/webpack.base.babel.js')
module.exports = ({ config }) => {
  const defualtConfig = genBaseConfig(config)
  config.resolve.modules.push('app')
  config.resolve.alias = config.resolve.alias
  config.resolve.extensions.push('.js', '.jsx', '.react.js')

  config.module.rules.push(...defualtConfig.module.rules)
  return config
};
