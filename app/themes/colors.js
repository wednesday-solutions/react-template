/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

const primary = '#fcedda';
const text = '#212529';
const secondary = '#f8c49c';
const success = '#28a745';
const error = '#dc3545';
const gotoStories = '#1890ff';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  secondary,
  success,
  error,
  gotoStories,
  theme: {
    lightMode: {
      primary: '#fcedda',
      secondary: '#f8c49c',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#212529',
      textSecondary: '#6c757d',
      border: '#e0e0e0',
      shadow: 'rgba(0, 0, 0, 0.1)',
      hover: '#f1f3f5',
      accent: '#1890ff',
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107'
    },
    darkMode: {
      primary: '#2d3748',
      secondary: '#4a5568',
      background: '#1a202c',
      surface: '#2d3748',
      text: '#f7fafc',
      textSecondary: '#cbd5e0',
      border: '#4a5568',
      shadow: 'rgba(0, 0, 0, 0.3)',
      hover: '#374151',
      accent: '#60a5fa',
      success: '#48bb78',
      error: '#f56565',
      warning: '#ed8936'
    }
  }
};

// This same file is used in the webpack.config.base.js as well and hence cannot use
// export default and must use module.exports
// eslint-disable-next-line import/no-commonjs
module.exports = colors;
