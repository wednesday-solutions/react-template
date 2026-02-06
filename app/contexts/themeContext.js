import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  theme: {}
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Update document class for global styles
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = useMemo(
    () => ({
      isDarkMode,
      toggleTheme,
      colors: isDarkMode
        ? {
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
        : {
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
          }
    }),
    [isDarkMode]
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ThemeContext;
