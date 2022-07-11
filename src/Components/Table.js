import React, { useContext, useState } from 'react';
import MyContext from '../Context';

function Table() {
  const { data, nameFilter, setNameFilter, setColumnFilter,
    setComparisonFilter, setValueFilter } = useContext(MyContext);
  const [columnFilterState, setColumnFilterState] = useState('population');
  const [comparisonFilterState, setComparisonFilterState] = useState('>');
  const [valueFilterState, setValueFilterState] = useState(0);

  const handleNameFilter = (e) => {
    setNameFilter(e.target.value);
  };

  const handleColumnFilter = ({ target }) => {
    setColumnFilterState(target.value);
  };
  const handleComparisonFilter = ({ target }) => {
    setComparisonFilterState(target.value);
  };
  const handleValueFilter = ({ target }) => {
    setValueFilterState(target.value);
  };

  const sendFilters = () => {
    // e.preventDefault();
    setColumnFilter(columnFilterState);
    setComparisonFilter(comparisonFilterState);
    setValueFilter(Number(valueFilterState));
  };

  // console.log(data);
  return (
    <div>
      <label htmlFor="nameFilter ">
        Filtro
        <input
          type="text"
          id="nameFilter"
          data-testid="name-filter"
          value={ nameFilter }
          onChange={ handleNameFilter }
        />
      </label>
      <form>
        <label htmlFor="selectColumn">
          <select
            onChange={ handleColumnFilter }
            data-testid="column-filter"
            id="selectColumn"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="selectComparison">
          <select
            onChange={ handleComparisonFilter }
            data-testid="comparison-filter"
            id="selectColumn"
          >
            <option value=">">maior que</option>
            <option value="<">menor que</option>
            <option value="===">igual a</option>
          </select>
        </label>
        <input onChange={ handleValueFilter } data-testid="value-filter" type="number" />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ sendFilters }
        >
          Pesquisar
        </button>
      </form>
      <table>
        <tr>
          {data.length && Object.keys(data[0]).map((i) => (
            <th key={ i }>{i}</th>
          ))}
        </tr>
        {data.map((i) => (
          <tr key={ i.name }>
            <td>{i.name}</td>
            <td>{i.rotation_period}</td>
            <td>{i.orbital_period}</td>
            <td>{i.diameter}</td>
            <td>{i.climate}</td>
            <td>{i.gravity}</td>
            <td>{i.terrain}</td>
            <td>{i.surface_water}</td>
            <td>{i.population}</td>
            <td>{i.films}</td>
            <td>{i.created}</td>
            <td>{i.edited}</td>
            <td>{i.url}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Table;