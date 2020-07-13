/**
 *
 * Stories for Header
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Header from '../index';

storiesOf('Header').add('simple', () => <Header id={text('id', 'Header')} />);
