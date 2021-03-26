/**
 *
 * Stories for Datelist
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Datelist from '../index';

storiesOf('Datelist').add('simple', () => <Datelist id={text('id', 'Datelist')} />);
