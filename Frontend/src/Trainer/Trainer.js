import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaDumbbell, FaUser } from "react-icons/fa";
import TrainerNavbar from "./TrainerNavbar";
import { useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import "./Styles.css";

function Trainer({ children }) {
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
      <TrainerNavbar />
      <div className="layout-container">
        <div
          className="sidebar bg-dark"
          style={{ border: "2px solid #aeff00", display: "flex" }}
        >
          <div className="sidebar-header">
            <h3>Trainer</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/trainer/addcustomer"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUser className="icon" /> Add Customer
            </NavLink>
            <NavLink
              to="/trainer/viewcustomer"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUsers className="icon" /> view Customers
            </NavLink>
            <NavLink
              to="/trainer/viewmachines"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaDumbbell className="icon" /> Machines
            </NavLink>
          </nav>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Trainer;
