import React from 'react';
import { renderWithIntl } from '@utils/testUtils';
import SoundCard from '../index';

describe('<SoundCard /> tests', () => {
  let submitSpy;
  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<SoundCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 SoundCard component', () => {
    const { getAllByTestId } = renderWithIntl(<SoundCard />);
    expect(getAllByTestId('sound-card').length).toBe(1);
  });
});
