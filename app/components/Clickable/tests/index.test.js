/**
 *
 * Tests for Clickable
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderWithIntl } from '@utils/testUtils';
import Clickable from '../index';

describe('<Clickable /> component tests', () => {
  let clickSpy;
  beforeAll(() => {
    clickSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<Clickable textId="repo_list" onClick={clickSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 Clickable component', () => {
    const { getAllByTestId } = renderWithIntl(<Clickable textId="repo_list" onClick={clickSpy} />);
    expect(getAllByTestId('clickable').length).toBe(1);
  });

  it('should contain render the text according to the textId', () => {
    const { getAllByText } = renderWithIntl(<Clickable textId="repo_list" onClick={clickSpy} />);
    expect(getAllByText(/Repository List/).length).toBe(1);
  });

  it('should call the prop onClick when the clickable component is clicked', () => {
    const { getAllByText, queryByText } = renderWithIntl(<Clickable onClick={clickSpy} textId="repo_list" />);
    expect(getAllByText(/Repository List/).length).toBe(1);
    fireEvent.click(queryByText(/Repository List/));
    expect(clickSpy).toBeCalled();
  });
});
