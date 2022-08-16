/**
 *
 * Tests for Form container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { FormTest as Form } from '../index';

describe('<Form /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Form />);
    expect(baseElement).toMatchSnapshot();
  });
});
