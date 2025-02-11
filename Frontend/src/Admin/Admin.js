import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaDumbbell, FaUsers, FaCreditCard } from "react-icons/fa";
import { GrPlan } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("userName");
    setUserName(storedUserName); 
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
      <AdminNavbar />
      <div className="layout-container">
        <div
          className="sidebar bg-dark"
          style={{ border: "2px solid #aeff00", display: "flex" }}
        >
          <div className="sidebar-header">
            <h3>Admin</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/admin/viewCustomer"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUsers className="icon" /> Customer
            </NavLink>
            <NavLink
              to="/admin/viewTrainer"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUser className="icon" /> Trainer
            </NavLink>
            <NavLink
              to="/admin/viewMachines"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaDumbbell className="icon" /> Machines
            </NavLink>

            <NavLink
              to="/admin/viewplans"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <GrPlan className="icon" />
              Plans
            </NavLink>

            <NavLink
              to="/admin/viewPayment"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaCreditCard className="icon" /> Payment
            </NavLink>
          </nav>
        </div>

        <div className="main-content">
            {children}</div>
      </div>
    </div>
  );
}

export default Admin;
