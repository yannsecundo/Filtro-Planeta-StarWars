import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function RenderFilter() {
  const {
    filters: { filterByNumbers },
    setFilterByNumbers,
  } = useContext(PlanetContext);

  return (
    <div>
      {filterByNumbers.map((filter) => (
        <div key={ filter.column } data-testid="filter">
          <span>{filter.column}</span>
          <button
            type="button"
            onClick={ () => setFilterByNumbers(
              filterByNumbers.filter(
                (filterNum) => filterNum.column !== filter.column,
              ),
            ) }
          >
            x
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => setFilterByNumbers([]) }
      >
        {' '}
        remove all

      </button>
    </div>
  );
}

export default RenderFilter;
