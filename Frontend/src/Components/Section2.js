import React from "react";
import { useNavigate } from "react-router-dom";

function Section2() {
  const navigate = useNavigate(); // Hook for navigation

  const handleCardClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="container-1 bg-dark mt-5 pt-5">
      <h2
        className="gym-plan text-center mb-4 text-white fw-bolder fs-1 mt-5"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        GYM-X Plans
      </h2>
      <div className="row row-cols-1 row-cols-md-3 g-4 mx-0">
        {/* Diamond Plan */}
        <div className="col">
          <div
            className="card h-100 bg-dark text-white"
            onClick={handleCardClick}
            style={{ cursor: "pointer" }} // Add cursor pointer for better UX
          >
            <img
              src="./assests/img1.webp"
              className="card-img-top"
              alt="Diamond Plan"
              style={{
                height: "300px",
                objectFit: "cover",
                border: "2px solid #aeff00",
                borderRadius: "5%",
              }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Diamond Plan</h5>
              <p className="card-text">
                Premium access to all facilities, personal training, and more.
              </p>
              <div
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px",
                  borderRadius: "5px",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                3000/month
              </div>
            </div>
          </div>
        </div>

        {/* Gold Plan */}
        <div className="col">
          <div
            className="card h-100 bg-dark text-white"
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
          >
            <img
              src="./assests/img2.jpg"
              className="card-img-top"
              alt="Gold Plan"
              style={{
                height: "300px",
                objectFit: "cover",
                border: "2px solid #aeff00",
                borderRadius: "5%",
              }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Gold Plan</h5>
              <p className="card-text">
                Access to all gym equipment and group classes.
              </p>
              <div
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px",
                  borderRadius: "5px",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                2000/month
              </div>
            </div>
          </div>
        </div>

        {/* Silver Plan */}
        <div className="col">
          <div
            className="card h-100 bg-dark text-white"
            onClick={handleCardClick}
            style={{ cursor: "pointer" }}
          >
            <img
              src="./assests/img3.jpeg"
              className="card-img-top"
              alt="Silver Plan"
              style={{
                height: "300px",
                objectFit: "cover",
                border: "2px solid #aeff00",
                borderRadius: "5%",
              }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">Silver Plan</h5>
              <p className="card-text">Basic gym access and group classes.</p>
              <div
                style={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px",
                  borderRadius: "5px",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                1500/month
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;
