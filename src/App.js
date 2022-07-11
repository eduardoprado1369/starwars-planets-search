import React from 'react';
import './App.css';
import Provider from './Provider';
import Table from './Components/Table';

function App() {
  return (
    <Provider>
      <div>
        <Table />
      </div>
    </Provider>
  );
}

export default App;
