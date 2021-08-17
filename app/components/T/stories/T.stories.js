/**
 *
 * Stories for T
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import { T } from '../index';

storiesOf('T').add('simple', () => <T id={text('id', 'T')} />);
