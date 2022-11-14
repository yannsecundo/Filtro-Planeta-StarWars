import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';

function TableBody() {
  const { data, filters: { nameFilter, filterByNumbers } } = useContext(PlanetContext);

  const keys = Object.keys(data[0] || {}).filter((key) => key !== 'residents');

  const filteredData = data
    .filter((planet) => planet.name.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((planet) => filterByNumbers
      .every(({ column, comparison, value }) => {
        if (comparison === 'maior que') {
          return +planet[column] > +value;
        }
        if (comparison === 'menor que') {
          return +planet[column] < +value;
        }
        return +planet[column] === +value;
      }));
  return (
    <tbody>
      {filteredData.map((planet) => (
        <tr key={ planet.name }>
          {keys.map((key) => (
            <td key={ key }>{planet[key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
