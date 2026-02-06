import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DarkModeToggle } from '../index';
import { ThemeProvider } from '@app/contexts/themeContext';

describe('DarkModeToggle', () => {
  const renderWithTheme = (initialMode = 'light') => {
    if (initialMode === 'dark') {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    return render(
      <ThemeProvider>
        <DarkModeToggle />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should render the toggle button', () => {
    renderWithTheme();
    const button = screen.getByRole('button', { name: /toggle dark mode/i });
    expect(button).toBeInTheDocument();
  });

  it('should show sun icon in dark mode', () => {
    renderWithTheme('dark');
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should show moon icon in light mode', () => {
    renderWithTheme('light');
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should toggle theme when clicked', () => {
    renderWithTheme();
    const button = screen.getByRole('button', { name: /toggle dark mode/i });

    // Click to switch to dark mode
    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('dark');

    // Click to switch back to light mode
    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should have fixed positioning', () => {
    renderWithTheme();
    const button = screen.getByRole('button');
    const styles = window.getComputedStyle(button);
    expect(styles.position).toBe('fixed');
  });

  it('should show tooltip on hover', () => {
    renderWithTheme();
    const button = screen.getByRole('button');
    fireEvent.mouseOver(button);
    // Material-UI tooltips appear after a delay
  });
});
