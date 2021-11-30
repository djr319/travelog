import { StrictMode } from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
// import Trips from './Components/Trips';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
