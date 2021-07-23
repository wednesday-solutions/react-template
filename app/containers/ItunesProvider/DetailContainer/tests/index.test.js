/**
 *
 * Tests for DetailContainer
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { DetailContainerTest as DetailContainer } from '../index';

describe('<DetailContainer /> container tests', () => {
  let submitSpy;
  jest.mock('react-router-dom', () => ({
    __esModule: true,
    useParams: jest.fn().mockReturnValue({ trackId: '1' })
  }));
  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<DetailContainer dispatchTrack={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchTrack on render', async () => {
    renderProvider(<DetailContainer dispatchTrack={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should call dispatchClearTrack on unmount', async () => {
    const clearSpy = jest.fn();
    const submitSpy = jest.fn();
    const { unmount } = renderProvider(<DetailContainer dispatchClearTrack={clearSpy} dispatchTrack={submitSpy} />);
    await timeout(500);
    expect(submitSpy).toBeCalled();
    unmount();
    await timeout(500);
    expect(clearSpy).toBeCalled();
  });
});
