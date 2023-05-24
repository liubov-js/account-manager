import React from 'react';
import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { getAge } from '../../utils';
import Avatar from '@mui/material/Avatar';
import './Person.scss';

export const Person = ({ fullName, dateOfBirth, imageUrl }) => {
  return (
    <Card className='PersonCard'>
      <Avatar sx={{ width: 100, height: 100 }} src={imageUrl} variant='square'/>
      <CardContent className='PersonContent'>
        <Typography gutterBottom variant="h5" component="div" className='PersonText'>
          {fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary" className='PersonText'>
          {getAge(dateOfBirth)} years old
        </Typography>
      </CardContent>
    </Card>
  );
};
