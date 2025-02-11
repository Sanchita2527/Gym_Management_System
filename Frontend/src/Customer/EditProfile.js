import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import CustomerNavbar from "./CustomerNavbar";
import Customer from "./Customer";

function EditProfile() {
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

  const customerId = sessionStorage.getItem("userId");
  const updateUrl = `http://localhost:8080/customer/updateCustomer/${customerId}`;
  const editUrl = `http://localhost:8080/customer/getCustomerById/${customerId}`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get(editUrl, config)
      .then((response) => {
        const { name, email, contact, gender, password } = response.data;
        setName(name || "");
        setEmail(email || "");
        setPhoneNumber(contact || "");
        setGender(gender || "");
        setPassword(password || "");
      })
      .catch((error) => {
        console.error("Error occurred getting customer detail:", error);
        toast.error("Failed to fetch customer details");
      });
  }, [editUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .put(updateUrl, { name, email, contact, gender, password }, config)
      .then(() => {
        toast.success("Profile updated successfully!", {
          position: "top-center",
          autoClose: 500, // Toast will auto-close after 500ms
        });
        setTimeout(() => {
          navigate("/customer"); // Redirect to View Machines page
        }, 2000);
      })
      .catch(() => {
        toast.error("Failed to update profile");
      });
  };

  return (
    <Customer>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            border: "1px solid white",
            color: "white",
            display: "flex",
            flexDirection: "column",
            border: "2px solid #aeff00",
            backgroundColor: "black",
          }}
        >
          <h2 className="text-center mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ height: "30px" }}
              />
            </div>

            <div className="mb-3">
              <label>Mobile:</label>
              <input
                type="text"
                className="form-control"
                value={contact}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10}
                pattern="\d{10}"
                style={{ height: "30px" }}
              />
            </div>

            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: "30px" }}
              />
            </div>

            <div className="mb-3">
              <label>Gender:</label>
              <div className="d-flex">
                <div className="form-check me-3">
                  <input
                    type="radio"
                    id="male"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="male" className="form-check-label">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="female"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="form-check-input"
                  />
                  <label htmlFor="female" className="form-check-label">
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ height: "30px" }}
              />
            </div>

            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#aeff00" }}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Customer>
  );
}

export default EditProfile;
