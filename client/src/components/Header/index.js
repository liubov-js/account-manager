import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  const isAuth = Boolean(localStorage.getItem('token'));

  const onClickLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className='HeaderContainer'>
      <Container maxWidth="lg">
        <div className='Inner'>
          <Link className='Logo' to={isAuth ? "/people" : "/"}>
            <div>Account manager</div>
          </Link>
          <div className='Buttons'>
            {isAuth ? (
              <>
                <Link to="/account">
                  <Button variant="contained">Profile</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
