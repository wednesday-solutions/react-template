/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { Trans } from '@lingui/react';

/**
 * Represents a NotFound component that renders a translated "Not Found" message.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @returns {JSX.Element} A heading element containing the translated "Not Found" message.
 */
export default function NotFound() {
  return (
    <h1>
      <Trans id="not_found_page_container" />
    </h1>
  );
}
