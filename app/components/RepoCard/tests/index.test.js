/**
 *
 * Tests for RepoCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderWithIntl } from '@utils/testUtils';
import RepoCard from '../index';

describe('<RepoCard />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<RepoCard />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 RepoCard component', () => {
    const { getAllByTestId } = renderWithIntl(<RepoCard />);
    expect(getAllByTestId('repo-card').length).toBe(1);
  });
});
