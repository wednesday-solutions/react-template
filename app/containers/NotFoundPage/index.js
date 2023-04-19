/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { Trans } from '@lingui/react';

export default function NotFound() {
  return (
    <h1>
      <Trans id="not_found_page_container" />
    </h1>
  );
}
