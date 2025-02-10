import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

function About() {
  return (
    <div>
      <Navbar />
      <div style={{ position: "relative" }}>
        <img
          src="./assests/about.webp"
          alt="About us"
          className="img-fluid"
          style={{ height: "90vh", objectFit: "cover", width: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "2.2rem", fontWeight: "bold",color:"#aeff00",marginTop:"1.2rem" }}>About Us</h1>
          <p style={{ fontSize: "1.2rem", marginTop: "25px", color:"#BCCCDC",fontWeight: "bold" }}>
            World-class fitness facilities and a comprehensive range of workout
            programs tailored to meet the needs of diverse fitness enthusiasts
            is what sets us apart from others. Gym-X India, a part of this
            esteemed legacy, has expanded its presence across various cities,
            aiming to empower individuals to achieve their fitness goals,
            regardless of their fitness levels or aspirations. It's a fitness
            haven that combines state-of-the-art equipment, expert trainers, and
            a supportive community to foster a holistic approach to wellness.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
