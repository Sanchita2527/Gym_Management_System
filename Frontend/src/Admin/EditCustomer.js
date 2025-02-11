import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function EditCustomer() {
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

  const { id } = useParams(); // Retrieve the customer ID from the URL

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

  const editUrl = `http://localhost:8080/admin/getCustomerById/${id}`;
  const updateUrl = `http://localhost:8080/admin/updatecustomer/${id}`;

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get(editUrl, config)
      .then((response) => {
        const { name, email, phoneNumber, gender } = response.data;
        setName(name || "");
        setEmail(email || "");
        setPhoneNumber(phoneNumber || "");
        setGender(gender || "");
      })
      .catch((error) => {
        console.error("Error occurred getting customer details:", error);
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
      .put(updateUrl, { email, phoneNumber, gender }, config)
      .then(() => {
        toast.success("Customer updated successfully!");
        setTimeout(() => {
          navigate("/admin/viewcustomers"); // Redirect to View Customers page
        }, 2000); // 2-second delay to show toast
      })
      .catch((error) => {
        console.error("Failed to update customer:", error);
        toast.error("Failed to update customer.");
      });
  };

  return (
    <Admin>
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
          <h2 className="text-center mb-4">Edit Customer</h2>
          <form onSubmit={handleSubmit}>
            {/* Name - Non-editable */}
            <div className="mb-3">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                readOnly
                style={{ height: "30px", backgroundColor: "#e9ecef" }}
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label>Phone Number:</label>
              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10}
                pattern="\d{10}"
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Gender */}
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

            {/* Submit Button */}
            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#aeff00" }}
              >
                Edit Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default EditCustomer;
