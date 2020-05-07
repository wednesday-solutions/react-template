/**
 *
 * Tests for For
 *
 */

import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import For from '../index';

describe('<For />', () => {
  it('should render the number of elements passed as props', () => {
    const items = ['a', 'b'];
    const { getAllByTestId } = renderWithIntl(
      <For
        of={items}
        renderItem={item => <div data-testid="child">{`item: ${item}`} </div>}
      />
    );
    expect(getAllByTestId('child').length).toEqual(items.length);
  });
});
