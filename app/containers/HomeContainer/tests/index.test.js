/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer } from '../index';

describe('<HomeContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<HomeContainer dispatchItunesSearch={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearItunesSearch on empty change', async () => {
    const getItunesSearchSpy = jest.fn();
    const clearItunesSearchSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <HomeContainer dispatchClearItunesSearch={clearItunesSearchSpy} dispatchItunesSearch={getItunesSearchSpy} />
    );
    // renderProvider renders the tree. It wires up everything and renders the children you pass it in.
    // note that it uses the react testing library render function.
    // getByTestId is a shortcut to container.querySelector(`[data-testid="${yourId}"]`)
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItunesSearchSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItunesSearchSpy).toBeCalled();
  });

  it('should call dispatchItunesSearch on change', async () => {
    const { getByTestId } = renderProvider(<HomeContainer dispatchItunesSearch={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'rihana' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });

  it('should call dispatchItunesSearch when a search term is present and data is empty', async () => {
    const { getByTestId } = renderProvider(
      <HomeContainer
        dispatchItunesSearch={submitSpy}
        itunesSearchTerm="rihana"
        itunesSearchData={{
          items: []
        }}
      />
    );
    getByTestId('search-bar').value = 'rihana';
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
