const path = require('path')
const genBaseConfig = require('../internals/webpack/webpack.base.babel.js')
module.exports = (baseConfig, env, defaultConfig = baseConfig.config) => {
  // baseConfig.config.babelQuery = ({options: {
  //         presets: ['@babel/preset-env'],
  //         plugins: ['@babel/plugin-proposal-object-rest-spread']
  // }});
  const config = genBaseConfig(baseConfig.config)
  defaultConfig.resolve.modules.push('app')
  defaultConfig.resolve.alias = config.resolve.alias
  defaultConfig.resolve.extensions.push('.js', '.jsx', '.react.js')

  defaultConfig.module.rules.push(...config.module.rules)
  return defaultConfig
};
