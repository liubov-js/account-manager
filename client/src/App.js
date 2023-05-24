import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { PeopleList } from './pages/PeopleList';
import { Profile } from './pages/Profile';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Registration /> } />
        <Route path='/account' element={ <Profile /> } />
        <Route path='/people' element={ <PeopleList /> } />
      </Routes>
    </>
  );
}

export default App;
