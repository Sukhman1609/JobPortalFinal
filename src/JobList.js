import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, CircularProgress} from '@material-ui/core';
import FilterPanel from './FilterPanel';
import './App.css';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(200);
  const [offset, setOffset] = useState(0);
  const [searchMinExp, setSearchMinExp] = useState('');
  const [searchCompanyName, setSearchCompanyName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [searchMaxJdSalary, setSearchMaxJdSalary] = useState('');

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const fetchJobs = async () => {
    setLoading(true);
     setLimit('');
     console.log(totalCount)
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      limit,
      offset,
      minExp: searchMinExp,
      companyName: searchCompanyName.toLowerCase(),
      location: searchLocation.toLowerCase() ,
      jobRole: searchRole.toLowerCase() ,
      maxJdSalary: searchMaxJdSalary
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: body
    };

    try {
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', requestOptions);
      const data = await response.json();

      if (data && Array.isArray(data.jdList)) {
        const filteredJobs = data.jdList.filter((job) => {
            const jobLocation = job.location.toLowerCase();
            const jobCompany = job.companyName.toLowerCase();
            const jobRrole = job.jobRole.toLowerCase();
            const jobExp = job.minExp !== null && job.minExp !== undefined ? job.minExp.toString() : '';
            const jobSalary = job.maxJdSalary !== null && job.maxJdSalary !== undefined ? job.maxJdSalary.toString() : '';
           
  
            return jobLocation.includes(searchLocation.toLowerCase()) && jobCompany.includes(searchCompanyName.toLowerCase()) && jobRrole.includes(searchRole.toLowerCase()) && jobExp.includes(searchMinExp.toString()) && jobSalary.includes(searchMaxJdSalary.toString())
          });
        setJobs(filteredJobs);
        setTotalCount(filteredJobs.length); 
      } else {
        console.error('Invalid response format:', data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
       fetchJobs(); 
  },[limit, offset, searchMinExp, searchCompanyName, searchLocation, searchRole, searchMaxJdSalary]);



  const applyFilters = (filters) => {
    setJobs([]); 
    setOffset(0);
    setSearchMinExp(filters.minExp);
    setSearchCompanyName(filters.companyName);
    setSearchLocation(filters.location); 
    setSearchRole(filters.jobRole); 
    setSearchMaxJdSalary(filters.maxJdSalary); 
  };

  return (
    <div className="job-list-container">
      <h1>Job Listings</h1>

      <FilterPanel onApplyFilters={applyFilters} />

      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid key={job.id} item xs={12} sm={6} md={3}>
            <Card className="job-card">
              <CardContent className="card-content">
                <img src={job.logoUrl} alt="Company Logo" className="logo" />
                <Typography variant="h5" component="h2" style={{ marginLeft:'80px', marginTop:'-60px'}}>
                  {capitalizeFirstLetter(job.jobRole)}
                </Typography>
                <Typography color="textSecondary" gutterBottom style={{ marginLeft:'80px'}}>
                  {job.companyName} - {capitalizeFirstLetter(job.location)}
                </Typography>
                <Typography>
                  <h4>Estimated Salary: {job.salaryCurrencyCode} {job.maxJdSalary}</h4>
                </Typography>
                <Typography variant="body2" component="p"  style={{fontSize:'10px'}}>
                  <h3>About Company:</h3> {job.jobDetailsFromCompany}
                </Typography>
                <Typography variant="body2" component="p" >
                  <h4>Minimum Experience: {job.minExp} years</h4>
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                style={{marginTop:'auto', backgroundColor: 'rgb(10, 222, 187)', margin: '0px 20px 0px 20px'}}
                target="_blank"
                className="apply-button"
              >
                Apply Now
              </Button>
              <Button
                variant="contained"
                color="primary"
                target="_blank"
               style={{ margin:'10px 20px 0px 20px'}}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Emblem-person-blue.svg/1024px-Emblem-person-blue.svg.png"
                  alt=""
                  width="20px"
                />
                &nbsp; Unlock referral asks
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {loading && <CircularProgress style={{ margin: '20px auto', display: 'block' }} />}

     
    </div>
  );
};

export default JobList;
