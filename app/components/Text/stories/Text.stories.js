/**
 *
 * Stories for Text
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import Text from '../index';

storiesOf('Text').add('simple', () => <Text id={text('id', 'Text')} />);
