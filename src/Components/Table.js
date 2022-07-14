import React, { useContext, useState } from 'react';
import MyContext from '../Context';

function Table() {
  const { data, nameFilter, setNameFilter, filters, setFilters } = useContext(MyContext);
  const [columnFilterState, setColumnFilterState] = useState('population');
  const [comparisonFilterState, setComparisonFilterState] = useState('maior que');
  const [valueFilterState, setValueFilterState] = useState(0);
  const [columnsOptions, setColumnsOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const sendFilters = () => {
    const currentFilter = {
      column: columnFilterState,
      comparison: comparisonFilterState,
      value: valueFilterState,
    };
    setFilters([...filters, currentFilter]);
    const filteredColumns = columnsOptions.filter((item) => item !== columnFilterState);
    setColumnsOptions(filteredColumns);
    setColumnFilterState(filteredColumns[0]);
  };

  const removeFilters = (currColumn) => {
    setFilters(filters.filter((i) => i.column !== currColumn));
    setValueFilterState('');
  };

  const removeAllFilters = () => {
    setFilters([]);
    setValueFilterState('');
  };

  return (
    <div>
      <form>
        <label htmlFor="nameFilter">
          Filtro
          <input
            type="text"
            id="nameFilter"
            data-testid="name-filter"
            value={ nameFilter }
            onChange={ ({ target }) => setNameFilter(target.value) }
          />
        </label>
      </form>
      <form>
        <label htmlFor="selectColumn">
          <select
            onChange={ ({ target }) => setColumnFilterState(target.value) }
            data-testid="column-filter"
            id="selectColumn"
            value={ columnFilterState }
          >
            {columnsOptions.map((item) => (
              <option value={ item } key={ item }>{item}</option>
            ))}
          </select>
        </label>
        <label htmlFor="selectComparison">
          <select
            onChange={ ({ target }) => setComparisonFilterState(target.value) }
            data-testid="comparison-filter"
            id="selectColumn"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          onChange={ ({ target }) => setValueFilterState(target.value) }
          data-testid="value-filter"
          type="number"
          value={ valueFilterState }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ sendFilters }
        >
          Pesquisar
        </button>
      </form>
      <button
        type="button"
        onClick={ removeAllFilters }
        data-testid="button-remove-filters"
      >
        Remover todas as filtragens

      </button>
      {filters.length > 0 && filters.map((el, index) => (
        <div data-testid="filter" key={ index }>
          {`${el.column} ${el.comparison} ${el.value}`}
          <button
            type="button"
            onClick={ () => removeFilters(el.column) }
          >
            Apagar
          </button>
        </div>
      ))}
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
