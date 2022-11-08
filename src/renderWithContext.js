import React from 'react';
import { render } from '@testing-library/react';
import PlanetProvider from './context/PlanetProvider';

export default function renderWithContext(children) {
  return (
    render(
      <PlanetProvider>
        { children }
      </PlanetProvider>,
    )
  );
}
