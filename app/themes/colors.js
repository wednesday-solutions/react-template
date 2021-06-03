const primary = '#fcedda';
const text = '#212529';
const secondary = '#f8c49c';
const success = '#28a745';
const error = '#dc3545';
const textPrimary = '#083445';
const textSecondary = '#149cd0';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  secondary,
  success,
  error,
  textPrimary,
  textSecondary,
  theme: {
    lightMode: {
      primary,
      secondary
    },
    darkMode: {
      primary: secondary,
      secondary: primary
    }
  }
};
module.exports = colors;
