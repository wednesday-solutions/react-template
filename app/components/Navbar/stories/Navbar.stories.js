/**
 *
 * Stories for Navbar
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Navbar from '../index';

storiesOf('Navbar').add('simple', () => <Navbar id={text('id', 'Navbar')} />);
