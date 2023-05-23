import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from '../axios';
import { Person } from '../components/Person';
import { CircularProgress } from '@mui/material';
import { headers } from '../utils';
import { BACKEND_URL } from '../constants';
import './Pages.scss';

export const PeopleList = () => {
  const [people, setPeople] = useState(undefined);

  useEffect(() => {
    axios
      .get('/people', { headers })
      .then(result => setPeople(result.data))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
      <Grid xs={8} item>
        {people ? people.map((person) => (
          <Person
            key={person._id}
            fullName={person.fullName}
            imageUrl={`${BACKEND_URL}${person.avatarUrl}` || ''}
            dateOfBirth={person.dateOfBirth}
          />
        )) : (
          <div className='CenterDiv'>
            <CircularProgress />
          </div>
        )}
      </Grid>
    </Grid>
  );
};
