import { StrictMode } from "react";
import { Dashboard, Journal } from "Components/index";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';

render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* <Route path="/trips" element={<Trips />} /> */}
          {/* <Route path="/profile" element={<Dashboard />} />
        <Route path="/planning" element={<Dashboard />} />
        <Route path="/notes" element={<Dashboard />} />
        <Route path="/route" element={<Dashboard />} />
        <Route path="/weather" element={<Dashboard />} />
        <Route path="/logout" element={<Dashboard />} /> */}
        </Route>
        <Route path="journal" element={<Journal />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>We've wandered off the beaten track. Nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
