/**
 *
 * Tests for FrontendContainer
 *
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { FrontendContainerTest as FrontendContainer } from '../index';

describe('<FrontendContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<FrontendContainer dispatchDashboard={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should call', async () => {
    const getDashboardSpy = jest.fn();
    const { getByTestId } = renderProvider(<FrontendContainer dispatchDashboard={getDashboardSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getDashboardSpy).toBeCalled();
  });

  it('should call dispatchDashboard on change', async () => {
    const { getByTestId } = renderProvider(<FrontendContainer dispatchDashboard={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some city' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
