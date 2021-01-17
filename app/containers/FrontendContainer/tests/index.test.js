/**
 *
 * Tests for FrontendContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
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
});
