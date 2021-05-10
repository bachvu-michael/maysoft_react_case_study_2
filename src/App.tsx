import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import EmployeesComponent from "./components/employeesComponent";



function App() {
  const [count,setCount] = useState(0);
  return (
    <Container maxWidth="md">
      <h1>Case study test</h1>
      <div className="App">
        <h2>1) Count</h2>
          <h5>{count}</h5>
          <Button variant="contained" color="primary" style={{marginRight:10}} onClick={() => { setCount( prevCount => prevCount + 1) }}>
            Count ++
          </Button>
          <Button variant="contained" color="secondary" onClick={() => { setCount(0) }}>
            reset
          </Button>
        <h2>2) Table</h2>
        <EmployeesComponent></EmployeesComponent>
      </div>
    </Container>

  );
}

export default App;
