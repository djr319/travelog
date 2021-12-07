import "./Dashboard.css";
import { useState, useEffect } from "react";
import { SliderData } from "./SliderData";
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
// import { TripsForm } from "Components";

// CHECK THE IMPLEMENTATION OF NOTIFY
// import { Toaster } from 'react-hot-toast';

export default function Dashboard(): JSX.Element {

  const length = SliderData.length;
  // const [current, setCurrent] = useState(Math.floor(Math.random() * SliderData.length));
  const current = Math.floor(Math.random() * SliderData.length);
  console.log("current slide:  ", current);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     nextSlide();
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  // const nextSlide = () => {
  //   const nextSlide = current === length - 1 ? 0 : current + 1;
  //   // setCurrent(current === length - 1 ? 0 : current + 1);
  //   setCurrent(nextSlide);
  //   console.log("current slide now: ",current);
  // };

  // const prevSlide = () => {
  //   setCurrent(current === 0 ? length - 1 : current - 1);
  // };

  return (
    <div className="dashboard">

      <div className="banner-text">
        <p className="shift0">Chat.</p>
        <p className="shift1">Plan.</p>
        <p className="shift2">Enjoy...</p>
      </div>

      <section className="slider">

        {/* <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} /> */}
        {/* {SliderData.map((slide, index) => { */}
          {/* return ( */}
            <div
              className= "slide active"
              // className={index === current ? "slide active" : "slide"}
              // key={index}
            >
              {/* {index === current && ( */}
                <img
                  className="preview-pictures"
                  // src={slide.image}
                  src={SliderData[current].image}
                  alt="preview pictures"
                />
              {/* )} */}
            </div>
          {/* ); */}
        {/* })} */}
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
