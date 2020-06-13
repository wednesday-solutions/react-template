/**
 *
 * Stories for Clickable
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Clickable from '../index';

storiesOf('Clickable').add('simple', () => <Clickable textId={text('textId', 'Clickable')} />);
