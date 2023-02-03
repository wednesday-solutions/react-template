/**
 *
 * Stories for T
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { T } from '../index';

export default {
  title: 'T',
  component: T
};

const Template = (args) => <T {...args} />;

export const SampleT = Template.bind();

SampleT.args = {
  id: 'repo_search'
};
