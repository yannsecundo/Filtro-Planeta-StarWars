import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import PlanetContext from './PlanetContext';

function PlanetProvider({ children }) {
  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filterByNumbers, setFilterByNumbers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const responseData = await response.json();
      setData(responseData.results);
    };
    fetchApi();
  }, []);
  const contextValue = useMemo(() => ({
    data,
    filters: {
      nameFilter,
      filterByNumbers,
    },
    setNameFilter,
    setFilterByNumbers,
  }), [data]);

  return (
    <PlanetContext.Provider value={ contextValue }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetProvider;
