import React from 'react';
import { Container, colors } from '@material-ui/core';
import JobList from './JobList';
import './App.css'

function App() {
  return (
    <Container>
      <h1 className='mainHead'>Job Portal</h1>
      <JobList />
    </Container>
  );
}

export default App;
