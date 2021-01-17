/**
 *
 * Stories for MenubarJs
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import MenubarJs from '../index';

storiesOf('MenubarJs').add('simple', () => <MenubarJs id={text('id', 'MenubarJs')} />);
