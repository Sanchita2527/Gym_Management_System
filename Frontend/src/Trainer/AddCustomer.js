import React, {useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Trainer from "./Trainer";

function AddCustomer() {
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

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
      gender: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      contact: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      gender: Yup.string().required("Gender is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        await axios.post(
          "http://localhost:8080/trainer/CreateCustomer",
          values,
          config
        );
        toast.success("Customer Added Successfully!", {
          position: "top-center",
          autoClose: 1000,
        });
        formik.resetForm(); // Reset the form after successful submission
      } catch (error) {
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    },
    
  });
  return (
    <Trainer>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-90">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            backgroundColor: "#2b2828",
            border: "1px solid white",
            color: "white",
            display: "flex",
            flexDirection: "column",
            border: "2px solid #aeff00",
          }}
        >
          <h2 className="text-center mb-4">Add Customer</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label>Name:</label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className="form-control"
                style={{ height: "30px" }}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>

            {/* Mobile Input */}
            <div className="mb-3">
              <label>Mobile:</label>
              <input
                type="text"
                {...formik.getFieldProps("contact")}
                className="form-control"
                style={{ height: "30px" }}
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-danger">{formik.errors.contact}</div>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="form-control"
                style={{ height: "30px" }}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            {/* Gender Input */}
            <div className="mb-3">
              <label>Gender:</label>
              <div className="d-flex">
                <div className="form-check me-3">
                  <input
                    type="radio"
                    id="male"
                    name="gender" // Ensure the name is the same for all radio buttons in the group
                    value="Male"
                    checked={formik.values.gender === "Male"} // Check if this radio button is selected
                    onChange={formik.handleChange} // Handle change explicitly
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
                    name="gender" // Ensure the name is the same for all radio buttons in the group
                    value="Female"
                    checked={formik.values.gender === "Female"} // Check if this radio button is selected
                    onChange={formik.handleChange} // Handle change explicitly
                    className="form-check-input"
                  />
                  <label htmlFor="female" className="form-check-label">
                    Female
                  </label>
                </div>
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-danger">{formik.errors.gender}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className="form-control"
                style={{ height: "30px" }}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#aeff00" }}
              >
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </Trainer>
  );
}

export default AddCustomer;
