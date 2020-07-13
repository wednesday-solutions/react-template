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
      <For of={items} renderItem={item => <div data-testid="child">{`item: ${item}`} </div>} />
    );
    expect(getAllByTestId('child').length).toEqual(items.length);
  });

  it('should render the number of elements passed as props and the parent should be a span', () => {
    const items = ['a', 'b'];
    const { getByTestId, getAllByTestId } = renderWithIntl(
      <For
        of={items}
        ParentComponent={props => <span {...props} data-testid="parent-span" />}
        renderItem={item => <div data-testid="child">{`item: ${item}`} </div>}
      />
    );

    expect(getAllByTestId('parent-span').length).toEqual(1);
    expect(getByTestId('parent-span').children.length).toEqual(items.length);
    expect(getAllByTestId('child').length).toEqual(items.length);
  });

  it('should render the number of elements passed as props and should not add another layer of dom nesting', () => {
    const items = ['a', 'b'];
    const { findByTestId, getAllByTestId } = renderWithIntl(
      <For
        of={items}
        noParent
        isRow={false}
        ParentComponent={props => <span {...props} data-testid="parent-span" />}
        renderItem={item => <div data-testid="child">{`item: ${item}`} </div>}
      />
    );

    expect(findByTestId('parent-span')).not.toBe();
    expect(getAllByTestId('child').length).toEqual(items.length);
  });

  it('should not render anything when items is not passed', () => {
    const { findByTestId } = renderWithIntl(
      <For
        noParent
        ParentComponent={props => <span {...props} data-testid="parent-span" />}
        renderItem={item => <div data-testid="child">{`item: ${item}`} </div>}
      />
    );

    expect(findByTestId('parent-span')).not.toBe();

    const rendered = renderWithIntl(
      <For
        ParentComponent={props => <span {...props} data-testid="parent-span" />}
        renderItem={item => <div data-testid="child">{`item: ${item}`} </div>}
      />
    );

    expect(rendered.findByTestId('parent-span')).not.toBe();
  });
});
