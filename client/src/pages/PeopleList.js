import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { Person } from '../components/Person';
import { CircularProgress } from '@mui/material';
import config from '../config.json';
import './Pages.scss';

export const PeopleList = () => {
  const [people, setPeople] = useState(undefined);

  useEffect(() => {
    axios
      .get('/people')
      .then(result => setPeople(result.data))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <div className='PeopleListContainer'>
      {people ? people.map((person) => (
        <Person
          key={person._id}
          fullName={person.fullName}
          imageUrl={`${config.BACKEND_URL}${person.avatarUrl}` || ''}
          dateOfBirth={person.dateOfBirth}
        />
      )) : (
        <div className='CenterDiv'>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};
