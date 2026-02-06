import { css } from '@emotion/react';

const globalStyles = css`
  :root {
    --transition-speed: 0.3s;
  }

  html,
  body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  /* Light Mode Styles */
  html.light-mode {
    #app {
      background-color: #ffffff;
      color: #212529;
      min-height: 100%;
      min-width: 100%;
      transition: all var(--transition-speed) ease;
    }
  }

  /* Dark Mode Styles */
  html.dark-mode {
    #app {
      background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
      color: #f7fafc;
      min-height: 100%;
      min-width: 100%;
      transition: all var(--transition-speed) ease;
    }

    /* Smooth transitions for all interactive elements */
    * {
      transition: background-color var(--transition-speed) ease, color var(--transition-speed) ease,
        border-color var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
    }

    /* Scrollbar styling for dark mode */
    ::-webkit-scrollbar {
      width: 12px;
    }

    ::-webkit-scrollbar-track {
      background: #1a202c;
    }

    ::-webkit-scrollbar-thumb {
      background: #4a5568;
      border-radius: 6px;

      &:hover {
        background: #60a5fa;
      }
    }
  }

  p,
  span,
  button,
  label {
    margin-top: 0;
    font-family: 'Helvetica Neue', Georgia, Times, 'Times New Roman', serif;
    font-size: 400;
    line-height: 1.5em;
    margin-bottom: 0;
  }

  /* Smooth animations for theme switch */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default globalStyles;
