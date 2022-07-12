import React from 'react';
import './App.css';
import Provider from './Provider';
import Table from './Components/Table';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
