import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function NameFilter() {
  const { filters: { nameFilter }, setNameFilter } = useContext(PlanetContext);

  return (
    <label htmlFor="nameFilter">
      <input
        type="text"
        id="nameFilter"
        data-testid="name-filter"
        value={ nameFilter }
        onChange={ (e) => setNameFilter(e.target.value) }
      />
    </label>
  );
}

export default NameFilter;
