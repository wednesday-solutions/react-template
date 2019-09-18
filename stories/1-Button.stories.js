import React from 'react'

import { action } from '@storybook/addon-actions'
import { Button } from '@storybook/react/demo'
import { text } from '@storybook/addon-knobs'

export default {
  title: 'Button'
}

export const buttonWithText = () => (
  <Button onClick={action('clicked')}> {text('Label', 'Hello Button')}</Button>
)

export const emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      {text('Label', '😀 😎 👍 💯')}
    </span>
  </Button>
)

emoji.story = {
  name: 'with emoji'
}
