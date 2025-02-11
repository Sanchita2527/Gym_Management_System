import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function ViewTrainer() {
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

  const [data, setData] = useState({ trainers: [], isFetching: false });
  const [searchText, setSearchText] = useState("");

  // Fetch trainers from API
  const fetchTrainers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    try {
      setData({ trainers: [], isFetching: true });
      const response = await axios.get(
        "http://localhost:8080/admin/getAllTrainers",
        config
      );
      setData({ trainers: response.data, isFetching: false });
    } catch (error) {
      console.error("Error fetching trainers:", error);
      setData({ trainers: [], isFetching: false });
      toast.error("Failed to fetch trainers.");
    }
  };

  // Remove trainer
  const removeTrainer = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    try {
      await axios.delete(
        `http://localhost:8080/admin/deleteTrainer/${id}`,
        config
      );
      toast.success("Trainer deleted successfully!", {
        position: "top-center",
        autoClose: 500,
      });
      setTimeout(() => {
        fetchTrainers(); // Redirect to View Trainers page
      }, 2000);
    } catch (error) {
      console.error("Error deleting trainer:", error);
      toast.error("Something went wrong while deleting the trainer.");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
      gender: "",
      timeSlot: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      contact: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      gender: Yup.string().required("Gender is required"),
      timeSlot: Yup.string().required("Time slot is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      try {
        await axios.post(
          "http://localhost:8080/admin/createTrainer",
          values,
          config
        );
        toast.success("Trainer added successfully!", {
          position: "top-center",
          autoClose: 500,
        });
        setTimeout(() => {
          fetchTrainers(); // Redirect to View Trainers page
          formik.resetForm(); // Reset form fields
        }, 2000);
      } catch (error) {
        console.error("Error adding trainer:", error);
        toast.error("Failed to add trainer.");
      }
    },
  });

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <Admin>
      <ToastContainer />
      <div className="container">
        <div className="content">
          {/* Add Trainer Form */}
          <div className="form-section">
            <h3>Add Trainer</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Trainer Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Trainer Name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-danger">{formik.errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Mobile Number"
                  {...formik.getFieldProps("contact")}
                />
                {formik.touched.contact && formik.errors.contact && (
                  <div className="text-danger">{formik.errors.contact}</div>
                )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  className="form-control"
                  {...formik.getFieldProps("gender")}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-danger">{formik.errors.gender}</div>
                )}
              </div>
              <div className="form-group">
                <label>Time Slot</label>
                <select
                  className="form-control"
                  {...formik.getFieldProps("timeSlot")}
                >
                  <option value="">Select Time Slot</option>
                  <option value="6AM-8AM">6AM-8AM</option>
                  <option value="8AM-10AM">8AM-10AM</option>
                  <option value="10AM-12PM">10AM-12PM</option>
                  <option value="4PM-6PM">4PM-6PM</option>
                  <option value="6PM-8PM">6PM-8PM</option>
                  <option value="8PM-10PM">8PM-10PM</option>
                </select>
                {formik.touched.timeSlot && formik.errors.timeSlot && (
                  <div className="text-danger">{formik.errors.timeSlot}</div>
                )}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger">{formik.errors.password}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Add Trainer
              </button>
            </form>
          </div>

          {/* View Trainers Section */}
          <div className="view-section">
            <div className="view-header">
              <h2>View Trainer Details</h2>
              <input
                type="text"
                className="form-control search-bar"
                placeholder="Search by Name or Email"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Time Slot</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.trainers
                  .filter((trainer) =>
                    searchText
                      ? trainer.name
                          .toLowerCase()
                          .includes(searchText.toLowerCase()) ||
                        trainer.email
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      : true
                  )
                  .map(
                    ({
                      trainnerId,
                      name,
                      contact,
                      email,
                      gender,
                      timeSlot,
                    }) => (
                      <tr key={trainnerId}>
                        <td>{trainnerId}</td>
                        <td>{name}</td>
                        <td>{contact}</td>
                        <td>{email}</td>
                        <td>{gender}</td>
                        <td>{timeSlot}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() =>
                              navigate(`/admin/edittrainer/${trainnerId}`)
                            }
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 95%;
          margin: 20px auto;
        }
        .content {
          display: flex;
          gap: 20px;
        }
        .form-section {
          flex: 1;
          background: #1e1c1c;
          color: white;
          padding: 20px;
          border-radius: 8px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-control {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
        }
        .view-section {
          flex: 2;
        }
        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .search-bar {
          max-width: 300px;
        }
      `}</style>
    </Admin>
  );
}

export default ViewTrainer;
