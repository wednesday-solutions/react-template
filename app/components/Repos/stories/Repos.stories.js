/**
 *
 * Stories for Repos
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Repos from '../index';

storiesOf('Repos').add('simple', () => <Repos id={text('id', 'Repos')} />);
