import React from 'react';
import TableBody from './TableBody';

function TablePlanet() {
  // const keys = [
  //   'Name',
  //   'Rotation Period',
  //   'Orbital Period',
  //   'Diameter',
  //   'Climate',
  //   'Gravity',
  //   'Terrain',
  //   'Surface Water',
  //   'Population',
  //   'Films',
  //   'Created',
  //   'Edited',
  //   'Url',
  // ];

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <TableBody />
    </table>
  );
}

export default TablePlanet;
