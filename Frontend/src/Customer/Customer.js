import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserEdit,
  FaChalkboardTeacher,
  FaDumbbell,
  FaAppleAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomerNavbar from "./CustomerNavbar";
import "./Styles.css";

function Customer({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "MEMBER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "TRAINER") {
      navigate("/trainer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate]);
  return (
    <div>
      <CustomerNavbar />
      <div className="layout-container">
        <div
          className="sidebar bg-dark"
          style={{
            border: "2px solid #aeff00",
            display: "flex",
            width: "175px",
          }}
        >
          <div className="sidebar-header">
            <h3>Customer</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/customer/editprofile"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUserEdit className="icon" /> Edit Profile
            </NavLink>

            <NavLink
              to="/customer/membership"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaDumbbell className="icon" /> Membership
            </NavLink>
            <NavLink
              to="/customer/dietplan"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaAppleAlt className="icon" /> Diet Plan
            </NavLink>
          </nav>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Customer;
