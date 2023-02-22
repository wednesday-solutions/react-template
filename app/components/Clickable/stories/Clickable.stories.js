/**
 *
 * Stories for Clickable
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { Clickable } from '../index';

export default {
  title: 'Clickable',
  component: Clickable
};

export const SampleClickable = () => <Clickable onClick={() => {}} textId={'stories'} />;
