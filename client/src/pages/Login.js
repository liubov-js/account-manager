import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from '../axios';
import { useForm } from 'react-hook-form';
import './Pages.scss';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (values) => {
    axios
      .post('/auth/login', values)
      .then(result => {
        localStorage.setItem('token', result.data.token);
        window.location.href = '/people';
      })
      .catch(err => console.log(err));
  };

  return (
    <Paper classes='LoginContainer'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className='Field'
          label="E-Mail"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Write correct email' })}
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
        <Button type="submit" size="large" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
};
