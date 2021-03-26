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
  .MenuBar {
    background-color: #e8f0fd;
    height: 600px;
    .MenuItem {
      height: 100px;
      margin-top: 20px;
      margin-right: 5px;
    }
  }
`;

function Menubar() {
  return (
    <MenuDiv data-testid="menubar-js">
      <Menu className="MenuBar">
        <Menu.Item className="MenuItem" key="1">
          <img src={logo} />
        </Menu.Item>
        <Menu.Item className="MenuItem" key="2">
          <img src={invoice} />
        </Menu.Item>
        <Menu.Item key="3" className="MenuItem">
          <img width="50" src={dash} />
        </Menu.Item>
      </Menu>
    </MenuDiv>
  );
}

Menubar.propTypes = {};

export default memo(Menubar);
