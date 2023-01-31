import { css } from '@emotion/react';

const globalStyles = css`
  html,
  body {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
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
`;

export default globalStyles;
