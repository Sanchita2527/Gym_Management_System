import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function EditTrainer() {
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
  const { id } = useParams(); // Retrieve the trainer ID from the URL

  const [name, setName] = useState("");
  const [contact, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const editUrl = `http://localhost:8080/admin/getTrainerById/${id}`;
  const updateUrl = `http://localhost:8080/admin/updateTrainer/${id}`;

  // Fetch trainer details
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get(editUrl, config)
      .then((response) => {
        const { name, contact, email, gender, timeSlot, password } =
          response.data;
        setName(name || "");
        setMobile(contact || "");
        setEmail(email || "");
        setGender(gender || "");
        setTimeSlot(timeSlot || "");
        setpassword(password || "");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trainer details:", error);
        toast.error("Failed to fetch trainer details.");
        setIsLoading(false);
      });
  }, [editUrl]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gender || !timeSlot || !name || !contact || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    // axios
    //   .put(
    //     updateUrl,
    //     {id, name, contact, email, gender, timeSlot, password },
    //     config
    //   )
    //   .then(() => {
    //     toast.success("Trainer updated successfully!");
    //     setTimeout(() => {
    //       navigate("/admin/viewtrainers"); // Redirect to View Trainers page
    //     }, 2000); // 2-second delay to show toast
    //   })
    //   .catch((error) => {
    //     console.error("Error updating trainer:", error);
    //     toast.error("Failed to update trainer.");
    //   });

    axios
      .put(
        updateUrl,
        { name, contact, email, gender, timeSlot, password },
        config
      )
      .then((response) => {
        console.log("Response from API:", response);
        toast.success("Trainer updated successfully!");
        setTimeout(() => {
          navigate("/admin/viewTrainer");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating trainer:", error);
        toast.error("Failed to update trainer.");
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
          <h2 className="text-center mb-4">Edit Trainer</h2>
          {isLoading ? (
            <p>Loading trainer details...</p>
          ) : (
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
                  onChange={(e) => setMobile(e.target.value)}
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
                <label>Time Slot:</label>
                <select
                  className="form-control"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  style={{ height: "35px" }}
                >
                  <option value="">Select Time Slot</option>
                  <option value="6AM-8AM">6AM-8AM</option>
                  <option value="8AM-10AM">8AM-10AM</option>
                  <option value="10AM-12PM">10AM-12PM</option>
                  <option value="4PM-6PM">4PM-6PM</option>
                  <option value="6PM-8PM">6PM-8PM</option>
                  <option value="8PM-10PM">8PM-10PM</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  style={{ height: "30px" }}
                />
              </div>

              <div className="mb-3 w-100">
                <button
                  type="submit"
                  className="btn btn-light w-100"
                  style={{ backgroundColor: "#aeff00" }}
                >
                  Update Trainer
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Admin>
  );
}

export default EditTrainer;
