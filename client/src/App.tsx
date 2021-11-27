import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import './App.css';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  );
}
