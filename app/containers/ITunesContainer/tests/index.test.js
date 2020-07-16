/**
 *
 * Tests for ITunesContainer
 *
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ITunesContainerTest as ITunesContainer } from '../index';

describe('<ITunesContainer /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunesContainer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchITunes on change', async () => {
    const { getByTestId } = renderProvider(<ITunesContainer dispatchITunes={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'tune' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should call dispatchClearITunes on empty change', async () => {
    const getITunesSpy = jest.fn();
    const clearITunesSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ITunesContainer dispatchClearITunes={clearITunesSpy} dispatchITunes={getITunesSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getITunesSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearITunesSpy).toBeCalled();
  });
});
