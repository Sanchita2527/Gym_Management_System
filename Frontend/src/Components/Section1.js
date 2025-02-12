import React from "react";

function Section1() {
  return (
    <div className="mycontainer my-5">
      <div className="row align-items-center">
        <div className="col-lg-7 col-md-6 col-12 mb-4 mb-md-0">
          <h2 className="mb-4 fw-bolder fs-1">GYM-X</h2>
          <p className="mb-4 me-5 fs-5">
            Gym-X is a globally renowned fitness brand that has made its
            mark in India. With a strong legacy dating back to 1965 in Venice
            Beach, California, Gym-X has become synonymous with fitness
            excellence and innovation. Gym-X India carries the legacy ahead
            in the home country since its inception in 2002. World-class fitness
            facilities and a comprehensive range of workout programs tailored to
            meet the needs of diverse fitness enthusiasts is what sets us apart
            from others. Gym-X India, a part of this esteemed legacy, has
            expanded its presence across various cities, aiming to empower
            individuals to achieve their fitness goals, regardless of their
            fitness levels or aspirations. It's a fitness haven that combines
            state-of-the-art equipment, expert trainers, and a supportive
            community to foster a holistic approach to wellness.
          </p>
          <button className="btn btn-dark mb-4">Read More</button>
        </div>

        <div className="col-lg-5 col-md-6 col-12">
          <div className="row g-2">
            <img
              src="./assests/transform.webp"
              alt="Gym Transform"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
