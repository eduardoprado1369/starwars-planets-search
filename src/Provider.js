import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filters, setFilters] = useState([]);

  const filterArray = () => {
    const planets = nameFilter.length
      ? fetchedData.filter((i) => i.name.includes(nameFilter))
      : fetchedData;

    setData(planets);

    if (filters.length) {
      console.log('entrou');
      let filteredPlanets = fetchedData;
      filters.forEach((filter) => {
        console.log(filter.comparison);
        if (filter.comparison === 'maior que') {
          filteredPlanets = filteredPlanets
            .filter((i) => Number(i[filter.column]) > Number(filter.value));
        } if (filter.comparison === 'menor que') {
          filteredPlanets = filteredPlanets
            .filter((i) => Number(i[filter.column]) < Number(filter.value));
        } if (filter.comparison === 'igual a') {
          filteredPlanets = filteredPlanets
            .filter((i) => Number(i[filter.column]) === Number(filter.value));
        }
      });
      setData(filteredPlanets);
    }
  };

  const fetchAPI = async () => {
    const fetchItems = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const fetchJSON = await fetchItems.json();
    const planets = fetchJSON.results.map((i) => {
      delete i.residents;
      return i;
    });
    setFetchedData(planets);
    setData(planets);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    filterArray();
  }, [nameFilter, fetchedData, filters]);

  const contextValue = {
    data,
    nameFilter,
    setNameFilter,
    filters,
    setFilters,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
