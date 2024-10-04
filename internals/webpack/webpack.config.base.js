/**
 * COMMON WEBPACK CONFIGURATION
 */
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const colors = require('../../app/themes/colors');
const { getBasePublicPath } = require('../utils');

// generate webp format images
(async () => {
  const imagemin = (await import('imagemin')).default;
  const webp = (await import('imagemin-webp')).default;
  await imagemin(['app/images/*.{jpg,png,jpeg}'], {
    destination: 'app/images',
    plugins: [webp({ quality: 75 })]
  });
})();

const publicPath = getBasePublicPath();

const dotEnvFile = process.env.ENVIRONMENT_NAME === 'production' ? `.env` : `.env.${process.env.ENVIRONMENT_NAME}`;
const env = dotenv.config({ path: dotEnvFile }).parsed;
const envKeys = {
  ...Object.keys(process.env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {}),
  ...Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {})
};

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      // to run prod build locally, set public path to '/' instead of '/react-template/'
      publicPath
    },
    options.output
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: options.babelQuery
          }
        ]
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                  'primary-color': colors.secondary
                }
              },
              implementation: require('less')
            }
          }
        ]
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                enabled: false
                // NOTE: optipng is disabled as it causes errors in some Mac M1 & M2 environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // optimizationLevel: 7
              },
              pngquant: {
                enabled: false,
                quality: [0.65, 0.9],
                speed: 4
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      }
    ]
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new webpack.DefinePlugin(envKeys)
  ]),
  resolve: {
    modules: ['node_modules', 'app'],
    alias: {
      '@app': path.resolve(__dirname, '../../app'),
      '@components': path.resolve(__dirname, '../../app/components'),
      '@containers': path.resolve(__dirname, '../../app/containers'),
      '@utils': path.resolve(__dirname, '../../app/utils'),
      '@services': path.resolve(__dirname, '../../app/services'),
      '@themes': path.resolve(__dirname, '../../app/themes'),
      '@images': path.resolve(__dirname, '../../app/images'),
      '@hooks': path.resolve(__dirname, '../../app/hooks'),
      '@mui/base': '@mui/base/modern',
      '@mui/lab': '@mui/lab/modern',
      '@mui/material': '@mui/material/modern',
      '@mui/styled-engine': '@mui/styled-engine/modern',
      '@mui/system': '@mui/system/modern',
      '@mui/utils': '@mui/utils/modern',
      '@emotion/core': path.resolve(__dirname, '../../node_modules/moment/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, '../../node_modules/@emotion/styled'),
      'emotion-theming': path.resolve(__dirname, '../../node_modules/@emotion/react'),
      moment$: path.resolve(__dirname, '../../node_modules/moment/moment.js')
    },
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main']
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {}
});
