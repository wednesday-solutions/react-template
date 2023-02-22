/**
 *
 * Header
 *
 */

import React from 'react';
import { AppBar } from '@mui/material';
import styled from '@emotion/styled';
import { injectIntl } from 'react-intl';
import { fonts, colors } from '@themes';
import T from '@components/T';
import logo from '@images/icon-512x512.png';
const StyledHeader = styled(AppBar)`
  && {
    padding: 0 1rem;
    height: 7rem;
    display: flex;
    justify-content: center;
    background-color: ${colors.primary};
    flex-direction: row;
  }
`;
const Logo = styled.img`
  height: ${(props) => props.height};
  width: ${(props) => props.height};
  margin-top: 1rem;
`;
const Title = styled(T)`
  && {
    color: ${colors.text};
    margin-top: 0;
    margin-bottom: 0;
    ${fonts.dynamicFontSize(fonts.size.xRegular, 1, 0.5)};
    display: flex;
    align-self: center;
  }
`;
function Header(props) {
  return (
    <StyledHeader position="relative" {...props} data-testid="header">
      <Logo alt="logo" src={logo} width="auto" height="5rem" />
      <Title type="heading" id="wednesday_solutions" />
    </StyledHeader>
  );
}

export default injectIntl(Header);
