import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import axios from '../axios';
import { getAge, handleChangePhoto } from '../utils';
import CircularProgress from '@mui/material/CircularProgress';
import config from '../config.json';
import './Pages.scss';

export const Profile = () => {
  const inputRef = useRef(null);
  const [info, setInfo] = useState(undefined);
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    axios
      .get('/account')
      .then(result => {
        setInfo(result.data);
        setAvatarUrl(result.data.avatarUrl);
      })
      .catch(err => console.log(err));
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (info) {
      reset(info);
    }
  }, [info, reset]);

  const onSubmit = (values) => {
    values['avatarUrl'] = avatarUrl;

    axios
      .patch('/account', values)
      .then(() => {
        alert('Profile successfully updated');
      })
      .catch(err => console.log(err));
  }

  return (
    info ? (
      <Paper className='LoginContainer'>
        <Typography className='Title' variant="h5">
          Profile
        </Typography>
        <div className='Avatar'>
          {avatarUrl ? (
              <>
                <Avatar sx={{width: 100, height: 100}} src={`${config.BACKEND_URL}${avatarUrl}`}/>
                <Button onClick={() => setAvatarUrl('')} color="error" className='CenterDiv'>
                  Delete
                </Button>
              </>
            ) :
            <Button variant='outlined' size='large' onClick={() => inputRef.current.click()}>
              Photo
            </Button>}
          <input
            ref={inputRef}
            type='file'
            onChange={(event) => handleChangePhoto(event, setAvatarUrl)}
            hidden
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className='Field'
            label="Full name"
            defaultValue={info.fullName}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName?.message}
            {...register('fullName', { required: 'Write full name' })}
            fullWidth
          />
          <TextField
            disabled
            className='Field'
            label="E-Mail"
            defaultValue={info.email}
            fullWidth
          />
          <TextField
            disabled
            className='Field'
            label="Age"
            defaultValue={`${getAge(info.dateOfBirth)} years old`}
            fullWidth
          />
          <TextField
            disabled
            className='Field'
            defaultValue={info.gender.charAt(0).toUpperCase() + info.gender.slice(1)}
            label="Gender"
            fullWidth
          />
          <TextField
            className='Field'
            label="Password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Write password' })}
            fullWidth
          />
          <Button type='submit' size="large" variant="contained" fullWidth>
            Save
          </Button>
        </form>
      </Paper>
    ) : (
      <div className='CenterDiv'>
        <CircularProgress />
      </div>
    )
  );
};
