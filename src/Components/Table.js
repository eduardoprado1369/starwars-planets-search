import React, { useContext, useState } from 'react';
import MyContext from '../Context';

function Table() {
  const { data, nameFilter, setNameFilter, filters, setFilters } = useContext(MyContext);
  const [columnFilterState, setColumnFilterState] = useState('population');
  const [comparisonFilterState, setComparisonFilterState] = useState('maior que');
  const [valueFilterState, setValueFilterState] = useState(0);
  // const [thereIsPopulationFilter, setThereIsPopulationFilter] = useState(false);
  // const [thereIsOrbitalFilter, setThereIsOrbitalFilter] = useState(false);
  // const [thereIsDiameterFilter, setThereIsDiameterFilter] = useState(false);
  // const [thereIsRotationFilter, setThereIsRotationFilter] = useState(false);
  // const [thereIsSurfaceFilter, setThereIsSurfaceFilter] = useState(false);
  // const [timesPopulationFilter, setTimesPopulationFilter] = useState(0);
  // const [timesOrbitalFilter, setTimesOrbitalFilter] = useState(0);
  // const [timesDiameterFilter, setTimesDiameterFilter] = useState(0);
  // const [timesRotationFilter, setTimesRotationFilter] = useState(0);
  // const [timesSurfaceFilter, setTimesSurfaceFilter] = useState(0);
  const [columnsOptions, setColumnsOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surfac_water']);

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

  // const unableExistingFilters = () => {
  //   console.log(timesPopulationFilter);
  //   console.log('entrou no unableexistingfilters');
  //   if (timesPopulationFilter > 0) {
  //     setThereIsPopulationFilter(true);
  //   } else { setThereIsPopulationFilter(false); }
  //   if (timesOrbitalFilter > 0) {
  //     setThereIsOrbitalFilter(true);
  //   } else { setThereIsOrbitalFilter(false); }
  //   if (timesDiameterFilter > 0) {
  //     setThereIsDiameterFilter(true);
  //   } else { setThereIsDiameterFilter(false); }
  //   if (timesRotationFilter > 0) {
  //     setThereIsRotationFilter(true);
  //   } else { setThereIsRotationFilter(false); }
  //   if (timesSurfaceFilter > 0) {
  //     setThereIsSurfaceFilter(true);
  //   } else { setThereIsSurfaceFilter(false); }
  //   setTimesPopulationFilter(0);
  //   setTimesOrbitalFilter(0);
  //   setTimesDiameterFilter(0);
  //   setTimesRotationFilter(0);
  //   setTimesSurfaceFilter(0);
  // };

  // const checkExistingFilters = () => {
  //   console.log(filters);
  //   if (filters.length) {
  // setTimesPopulationFilter((prevState) => prevState + 1);
  // filters.forEach((i) => {
  //   if (i.column === 'population') {
  //     console.log('entrou no population');
  //     return setTimesPopulationFilter((prevState) => prevState + 1);
  //   }
  //   if (i.column === 'orbital_period') {
  //     return setTimesOrbitalFilter(timesOrbitalFilter + 1);
  //   }
  //   if (i.column === 'diameter') {
  //     return setTimesDiameterFilter(timesDiameterFilter + 1);
  //   }
  //   if (i.column === 'rotation_period') {
  //     return setTimesRotationFilter(timesRotationFilter + 1);
  //   }
  //   return setTimesSurfaceFilter(timesSurfaceFilter + 1);
  // });
  //   }
  //   unableExistingFilters();
  // };

  const removeFilters = (currColumn) => {
    setFilters(filters.filter((i) => i.column !== currColumn));
    setValueFilterState('');
  };

  const removeAllFilters = () => {
    setFilters([]);
    setValueFilterState('');
  };

  // useEffect(() => {
  //   console.log(`entrou no userEffect + ${filters[0]}`);
  //   console.log(filters);
  //   checkExistingFilters();
  // }, [filters]);

  // console.log(data);
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
            {/* {!thereIsPopulationFilter && <option value="population">population</option>}
            {!thereIsOrbitalFilter
             && <option value="orbital_period">orbital_period</option>}
            {!thereIsDiameterFilter && <option value="diameter">diameter</option>}
            {!thereIsRotationFilter
             && <option value="rotation_period">rotation_period</option>}
            {!thereIsSurfaceFilter
             && <option value="surface_water">surface_water</option>} */}
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
        // onClick={ () => setFilters([]) && setValueFilterState('') }
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
          {/* {index === 0 && (
            <button
              type="button"
              // onClick={ () => setFilters([]) && setValueFilterState('') }
              onClick={ removeAllFilters }
              data-testid="button-remove-filters"
            >
              Remover todas as filtragens

            </button>)} */}
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
