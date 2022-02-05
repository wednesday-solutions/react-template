/**
 *
 * Stories for ErrorCard
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import ErrorCard from '../index';

storiesOf('ErrorCard').add('simple', () => <ErrorCard id={text('id', 'ErrorCard')} />);
