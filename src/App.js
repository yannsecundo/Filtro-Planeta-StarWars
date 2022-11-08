import React from 'react';
import './App.css';
import NameFilter from './components/NameFilter';
import NumberFilter from './components/NumberFilter';
import RenderFilter from './components/RenderFilter';
import TablePlanet from './components/TablePlanet';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <img
        src="https://assets.turbologo.com/blog/pt/2019/11/19133642/star-wars-1977-logo.png"
        alt="star-wars-logo"
        width="100%"
        height="450"
      />
      <h1>Projeto Star Wars - Trybe</h1>
      <NameFilter />
      <RenderFilter />
      <NumberFilter />
      <TablePlanet />
    </PlanetProvider>
  );
}
export default App;
