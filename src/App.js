import React from 'react';
import './App.css';
import TablePlanet from './components/TablePlanet';
import PlanetProvider from './context/PlanetProvider';

function App() {
  return (
    <div>
      <img
        src="https://assets.turbologo.com/blog/pt/2019/11/19133642/star-wars-1977-logo.png"
        alt="star-wars-logo"
        width="100%"
        height="400"
      />
      <PlanetProvider>
        <TablePlanet />
      </PlanetProvider>
    </div>
  );
}
export default App;
