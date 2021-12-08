import "./Dashboard.css";
import { useState, useEffect } from "react";
import { SliderData } from "./SliderData";

// CHECK THE IMPLEMENTATION OF NOTIFY
// import { Toaster } from 'react-hot-toast';

export default function Dashboard(): JSX.Element {

  const length = SliderData.length;
  const current = Math.floor(Math.random() * SliderData.length);

  return (
    <div className="dashboard">

      <div className="banner-text">
        <p className="shift0">Plan.</p>
        <p className="shift1">Travel.</p>
        <p className="shift2">Explore...</p>
      </div>

      <section className="slider">
        <div
          className="slide active"
        >

          <img
            src={SliderData[current].image}
            alt="preview pictures"
          />
        </div>
      </section>

      {/* CHECK THE IMPLEMENTATION OF NOTIFY
      <Toaster 
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 5000,
        style: {
          background: '#84c1f8',
          color: 'white',
        }}}
      /> */}

    </div>
  );
}
