import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

const FilterPanel = ({ onApplyFilters }) => {
  const [minExp, setMinExp] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [maxJdSalary, setMaxJdSalary] = useState('');

  const handleApplyFilters = () => {
    const filters = {
      minExp,
      companyName,
      location,
      jobRole,
      maxJdSalary
    };
    onApplyFilters(filters);
  };

  return (
    <>
    <Grid container spacing={1}>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Min Experience"
          value={minExp}
          onChange={(e) => setMinExp(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Tech Stack"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Role"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label="Min Base Pay in USD"
          value={maxJdSalary}
          onChange={(e) => setMaxJdSalary(e.target.value)}
        />
      </Grid>

      <Grid item xs={12}  style={{ marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleApplyFilters} >
          Apply Filters
        </Button>
      </Grid>
    </Grid></>
  );
};

export default FilterPanel;
