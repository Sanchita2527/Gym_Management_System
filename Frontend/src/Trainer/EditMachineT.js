import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trainer from "./Trainer";

function EditMachineT() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [machinename, setMachineName] = useState("");
  const [price, setPrice] = useState("");
  const [machineStatus, setMachineStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const editUrl = `http://localhost:8080/trainer/getMachineById/${id}`;
  const updateUrl = `http://localhost:8080/trainer/editMachineStatus`;

  // Ensure only authorized users can access
  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else {
      const role = sessionStorage.getItem("userRole");
      if (role === "MEMBER") navigate("/customer");
      else if (role === "TRAINER") navigate("/trainer");
      else if (role === "ADMIN") navigate("/admin");
    }
  }, [navigate]);

  // Fetch machine details
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get(editUrl, config)
      .then((response) => {
        console.log("API Response:", response.data); // Debugging step
        const { machinename, price, machineStatus } = response.data; // Corrected destructuring to match API response
        setMachineName(machinename || "");
        setPrice(price || "");
        setMachineStatus(machineStatus || "");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching machine details:", error);
        toast.error("Failed to fetch machine details.");
        setIsLoading(false);
      });
  }, [editUrl]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    console.log("Submitting with MachineStatus:", machineStatus); // Debugging step

    const updatedUrl = `${updateUrl}/${id}?machineStatus=${machineStatus}`;

    axios
      .put(updatedUrl, {}, config)
      .then(() => {
        toast.success("Machine updated successfully!");
        setTimeout(() => navigate("/trainer/viewmachines"), 2000);
      })
      .catch((error) => {
        console.error("Error updating machine:", error);
         toast.error("Failed to update machine.", {
                  autoClose: 1000, // Timer in milliseconds (3 seconds)
                });
      });
  };

  return (
    <Trainer>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            border: "2px solid #aeff00",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <h2 className="text-center mb-4">Edit Machine</h2>
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Machine Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={machinename}
                  readOnly
                  style={{ backgroundColor: "#e9ecef" }}
                />
              </div>
              <div className="mb-3">
                <label>Price:</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  readOnly
                  style={{ backgroundColor: "#e9ecef" }}
                />
              </div>
              <div className="mb-3">
                <label>Status:</label>
                <select
                  className="form-control"
                  value={machineStatus} // Directly use the status value from the backend
                  onChange={(e) => setMachineStatus(e.target.value)}
                  required
                >
                  <option value="Working">Working</option>
                  <option value="Need Maintenance">Need Maintenance</option>
                </select>
              </div>

              <div className="mb-3 w-100">
                <button
                  type="submit"
                  className="btn btn-light w-100"
                  style={{ backgroundColor: "#aeff00" }}
                >
                  Update Machine
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Trainer>
  );
}

export default EditMachineT;
