/**
 *
 * MenubarJs
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types'
import logo from '@images/logo.svg';
import invoice from '@images/ic-my-invoices.svg';
import dash from '@images/ic-dash.svg';
import styled from 'styled-components';
// import { FormattedMessage as T } from 'react-intl';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
const MenuDiv = styled.div`
  width: 70px;
`;
function Menubar() {
  return (
    <MenuDiv data-testid="menubar-js">
      <Menu style={{ backgroundColor: '#e8f0fd', height: 600 }}>
        <Menu.Item style={{ height: 70, marginLeft: 0, marginTop: 20, padding: 5 }} key="1">
          <img src={logo} />
        </Menu.Item>
        <Menu.Item key="2" style={{ height: 70, marginTop: 80, padding: 10 }}>
          <img src={invoice} />
        </Menu.Item>
        <Menu.Item key="3" style={{ height: 70, marginTop: 60, padding: 10 }}>
          <img width="50" src={dash} />
        </Menu.Item>
      </Menu>
    </MenuDiv>
  );
}

Menubar.propTypes = {};

export default memo(Menubar);
