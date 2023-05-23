import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from 'react-hook-form';
import axios from '../axios';
import { MenuItem } from '@mui/material';
import { handleChangePhoto } from '../utils';
import { BACKEND_URL } from '../constants';

export const Registration = () => {
  const [imageUrl, setImageUrl] = useState('');
  const inputRef = useRef(null);

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      dateOfBirth: '',
      gender: 'male',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (values) => {
    const dateOfBirth = values.dateOfBirth;
    const dayOfBirth = dateOfBirth['$D'];
    const monthOfBirth = dateOfBirth['$M'];
    values.dateOfBirth = `${dateOfBirth['$y']}-${monthOfBirth + 1 > 9 
      ? monthOfBirth + 1 
      : '0' + (monthOfBirth + 1)}-${dayOfBirth > 9 
      ? dayOfBirth 
      : '0' + dayOfBirth}`;
    values.avatarUrl = imageUrl

    axios
      .post('/auth/register', values)
      .then(result => {
        localStorage.setItem('token', result.data.token)
        window.location.href = '/people';
      })
      .catch(err => console.log(err));
  };

  return (
    <Paper classes='LoginContainer'>
      <Typography classes='Title' variant='h5'>
        Create new account
      </Typography>
      <div className='Avatar'>
        {imageUrl ? (
          <>
            <Avatar sx={{width: 100, height: 100}} src={`${BACKEND_URL}${imageUrl}`}/>
            <Button onClick={() => setImageUrl('')} color='error' className='CenterDiv'>
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
          onChange={(event) => handleChangePhoto(event, setImageUrl)}
          hidden
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className='Field'
          label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', {required: 'Write full name'})}
          fullWidth
        />
        <TextField
          className='Field'
          label='E-Mail'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type='email'
          {...register('email', {required: 'Write email'})}
          fullWidth
        />
        <Controller
          control={control}
          name='dateOfBirth'
          render={({ field: { ref, onBlur, name, ...field } }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  {...field}
                  disableFuture
                  inputRef={ref}
                  className='Field'
                  label='Дата рождения'
                  renderInput={(inputProps) => (
                    <TextField
                      {...inputProps}
                      onBlur={onBlur}
                      error={Boolean(errors.dateOfBirth)}
                      helperText={errors.dateOfBirth?.message}
                      {...register('dateOfBirth', { required: 'Choose your date of birth' })}
                    />
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>
          )}
        />
        <TextField
          select
          fullWidth
          className='Field'
          defaultValue='male'
          label='Gender'
          error={errors.gender}
          helperText={errors.gender?.message}
        >
          <MenuItem value='male'>
            Male
          </MenuItem>
          <MenuItem value='female'>
            Female
          </MenuItem>
        </TextField>
        <TextField
          className='Field'
          label='Password'
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Write password' })}
          fullWidth
        />
        <Button type='submit' size='large' variant='contained' fullWidth>
          Register
        </Button>
      </form>
    </Paper>
  );
};
