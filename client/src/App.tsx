
import NavBar from 'Components/NavBar/NavBar';
// import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

export default function App(): JSX.Element {
  return (
    <div className='App'>
      <NavBar />
      <Outlet />

    </div>
  );
}
