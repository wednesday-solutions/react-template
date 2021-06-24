/**
 *
 * Stories for TrackCard
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import TrackCard from '../index';

storiesOf('TrackCard').add('simple', () => <TrackCard id={text('id', 'TrackCard')} />);
