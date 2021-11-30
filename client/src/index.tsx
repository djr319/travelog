import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { render } from 'react-dom';
import Dashboard from 'Components/Dashboard/Dashboard';
import './index.css';
import App from './App';
// import Trips from './Components/Trips';

render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path='/' element={<Dashboard />}>
          {/* <Route path="/trips" element={<Trips />} /> */}
          {/* <Route path="/profile" element={<Dashboard />} />
        <Route path="/planning" element={<Dashboard />} />
        <Route path="/journal" element={<Dashboard />} />
        <Route path="/notes" element={<Dashboard />} />
        <Route path="/route" element={<Dashboard />} />
        <Route path="/weather" element={<Dashboard />} />
        <Route path="/logout" element={<Dashboard />} /> */}
          <Route
            path='*'
            element={
              <main style={{ padding: '1rem' }}>
                <p>We've wandered off the beaten track. Nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
