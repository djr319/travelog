import "./Dashboard.css";
import { useState } from "react";
import { SliderData } from "./SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { TripsForm } from "Components";

export default function Dashboard(): JSX.Element {
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="dashboard">
      <div>Get the magic from your trips in an easy way</div>

      <section className="slider">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {SliderData.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <img
                  className="preview-pictures"
                  src={slide.image}
                  alt="preview pictures"
                />
              )}
            </div>
          );
        })}
      </section>
      {/* <div className="sign-in-buttons">
        <button className="sign-up">Sign up</button>
        <button className="log-in">Log In</button>
      </div> */}
    </div>
  );
}
