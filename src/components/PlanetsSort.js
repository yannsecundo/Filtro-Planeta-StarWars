import React from 'react';

function PlanetsSort() {
//   const [sortFilters, setsortFilters] = useState({
//     column: 'population',
//     comparison: 'Descendente',
//   });
  // criar um filterBysort no context?
  // pegar o radio button cliclado de alguma forma pra usar na logica do click
  // da pra usar o proprio filterbynumber pra ordenar?
  return (
    <div>
      <select>
        <option value="population"> Population</option>
        <option value="orbital_period"> Orbital Period</option>
        <option value="diameter">Diameter</option>
        <option value="rotation_period">Rotation Period</option>
        <option value="surface_water">Surface water</option>
      </select>

      <label htmlFor="ascendente">
        <input type="radio" value="Ascedente" id="ascendente" name="sort" />
        Ascendente
      </label>
      <label htmlFor="descendente">
        <input type="radio" value="Descendente" id="descendente" name="sort" />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => {} }
      >
        Ordenar
      </button>
    </div>
  );
}

export default PlanetsSort;
