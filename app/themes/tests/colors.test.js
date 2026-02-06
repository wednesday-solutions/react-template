import colors from '../colors';

describe('colors', () => {
  it('should have the correct font-size', () => {
    expect(colors.theme.lightMode).toEqual({
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
    });
    expect(colors.theme.darkMode).toEqual({
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
    });
  });
});
