import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ITunesSearch } from '../index';
import configureStore from '@app/configureStore';
import { searchTracks, clearTracks } from '../actions';

jest.mock('@app/utils/injectReducer');
jest.mock('@app/utils/injectSaga');

describe('<ITunesSearch />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({});
    store.dispatch = jest.fn();
  });

  it('should render the search input', () => {
    render(
      <Provider store={store}>
        <ITunesSearch />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Search for tracks...')).toBeInTheDocument();
  });

  it('should dispatch searchTracks action on input change', () => {
    render(
      <Provider store={store}>
        <ITunesSearch />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search for tracks...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(store.dispatch).toHaveBeenCalledWith(searchTracks('test'));
  });

  it('should dispatch clearTracks action on empty input', () => {
    render(
      <Provider store={store}>
        <ITunesSearch />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search for tracks...');
    fireEvent.change(input, { target: { value: '' } });

    expect(store.dispatch).toHaveBeenCalledWith(clearTracks());
  });

  it('should dispatch clearTracks on unmount', () => {
    const { unmount } = render(
      <Provider store={store}>
        <ITunesSearch />
      </Provider>
    );

    unmount();

    expect(store.dispatch).toHaveBeenCalledWith(clearTracks());
  });

  it('should show error message when there is an error', () => {
    const error = new Error('Test error');
    const state = {
      itunesSearch: {
        error
      }
    };
    store = configureStore(state);

    render(
      <Provider store={store}>
        <ITunesSearch />
      </Provider>
    );

    expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument();
  });
});
