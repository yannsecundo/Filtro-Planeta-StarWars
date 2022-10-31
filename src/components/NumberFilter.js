import React, { useContext, useState, useEffect } from 'react';
import PlanetContext from '../context/PlanetContext';

function NumberFilter() {
  const {
    filters: { filterByNumbers },
    setFilterByNumbers,
  } = useContext(PlanetContext);

  const [numFilters, setNumFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const columnFilter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const setupColumnFilter = columnFilter.filter(
    (column) => !filterByNumbers.some((element) => column === element.column),
  );

  useEffect(() => {
    setNumFilters((prev) => ({ ...prev, column: setupColumnFilter[0] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNumbers]);

  const comparisonFilter = ['maior que', 'menor que', 'igual a'];

  const { column, comparison, value } = numFilters;

  return (
    <form>
      <label htmlFor="column">
        <select
          name="column"
          id="column"
          value={ column }
          onChange={ (e) => setNumFilters({ ...numFilters, column: e.target.value }) }
          data-testid="column-filter"
        >
          {setupColumnFilter.map((columnOption) => (
            <option key={ columnOption } value={ columnOption }>
              {columnOption}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          name="comparison"
          id="comparison"
          value={ comparison }
          onChange={ (e) => setNumFilters({ ...numFilters, comparison: e.target.value }) }
          data-testid="comparison-filter"
        >
          {comparisonFilter.map((comparisonOption) => (
            <option key={ comparisonOption } value={ comparisonOption }>
              {comparisonOption}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="value">
        <input
          type="text"
          name="value"
          id="value"
          value={ value }
          onChange={ (e) => setNumFilters({ ...numFilters, value: e.target.value }) }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => setFilterByNumbers([...filterByNumbers, numFilters]) }
      >
        filter
      </button>
    </form>
  );
}

export default NumberFilter;
