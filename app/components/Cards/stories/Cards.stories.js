/**
 *
 * Stories for Cards
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Cards from '../index';

storiesOf('Cards').add('simple', () => <Cards id={text('id', 'Cards')} />);
