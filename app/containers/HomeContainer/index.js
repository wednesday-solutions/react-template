import React from 'react';
import { Redirect } from 'react-router-dom';

export function HomeContainer() {
  return <Redirect to="/tracks" />;
}

export default HomeContainer;
