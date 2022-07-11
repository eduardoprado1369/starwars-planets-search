import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('>');
  const [valueFilter, setValueFilter] = useState(0);

  const filterArray = () => {
    const planets = nameFilter.length
      ? fetchedData.filter((i) => i.name.includes(nameFilter))
      : fetchedData;

    console.log(columnFilter, comparisonFilter, valueFilter);
    // console.log('chegou');

    if (columnFilter && comparisonFilter && valueFilter) {
      if (comparisonFilter === '>') {
        console.log(comparisonFilter);
        return setData(planets
          .filter((i) => Number(i[columnFilter]) > Number(valueFilter)));
      } if (comparisonFilter === '<') {
        console.log(comparisonFilter, columnFilter);
        return setData(planets
          .filter((i) => Number(i[columnFilter]) < Number(valueFilter)));
      } if (comparisonFilter === '===') {
        console.log(comparisonFilter);
        return setData(planets
          .filter((i) => Number(i[columnFilter]) === Number(valueFilter)));
      }
    }
    console.log(planets);
    console.log(data);
    setData(planets);
  };

  const fetchAPI = async () => {
    const fetchItems = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const fetchJSON = await fetchItems.json();
    // fetchJSON.results.forEach((item) => console.log(Object.keys(item)));
    // const planets = filter.length ? planetsfilter((i) => i.name.includes(nameFilter))
    //   : fetchJSON.results.filter((i) => delete i.residents);
    // nameFilter.length && planets = planetsfilter((item) => item.name.includes(nameFilter))
    // setData(planets);
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
  }, [nameFilter, fetchedData, columnFilter, comparisonFilter, valueFilter]);

  const contextValue = {
    data,
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
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
