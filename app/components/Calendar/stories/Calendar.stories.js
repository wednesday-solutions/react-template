/**
 *
 * Stories for Calendar
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Calendar from '../index';

storiesOf('Calendar').add('simple', () => <Calendar id={text('id', 'Calendar')} />);
