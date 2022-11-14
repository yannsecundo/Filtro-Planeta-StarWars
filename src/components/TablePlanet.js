import React from 'react';
import TableBody from './TableBody';

function TablePlanet() {
  const keys = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'Url',
  ];

  // const sort = () => {

  // };

  return (
    <table>
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={ key }>{key}</th>
          ))}
        </tr>
      </thead>
      <TableBody />
    </table>
  );
}

export default TablePlanet;
