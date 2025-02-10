import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function EditMachine() {
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

  const { id } = useParams(); // Retrieve the machine ID from the URL

  const [machinename, setMachineName] = useState("");
  const [price, setPrice] = useState("");
  const [machineStatus, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const editUrl = `http://localhost:8080/admin/getMachineById/${id}`;
  const updateUrl = `http://localhost:8080/admin/editMachineStatus`;

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
        const { machinename, price, machineStatus } = response.data;
        setMachineName(machinename || "");
        setPrice(price || "");
        setStatus(machineStatus || "");
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

    // Construct the URL with both `id` in the path and `isAvailable` as a query parameter
    const updatedUrl = `${updateUrl}/${id}?machineStatus=${machineStatus}`;

    // Send the PUT request
    axios
      .put(updatedUrl, {}, config) // No need for a body, as `isAvailable` is in the query
      .then(() => {
        toast.success("Machine updated successfully!");
        setTimeout(() => {
          navigate("/admin/viewmachines"); // Redirect to View Machines page
        }, 2000); // 2-second delay to show toast
      })
      .catch((error) => {
        console.error("Error updating machine:", error);
        toast.error("Failed to update machine.");
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
          <h2 className="text-center mb-4">Edit Machine</h2>
          <form onSubmit={handleSubmit}>
            {/* Machine Name - Non-editable */}
            <div className="mb-3">
              <label>Machine Name:</label>
              <input
                type="text"
                className="form-control"
                value={machinename}
                readOnly
                style={{ height: "30px", backgroundColor: "#e9ecef" }}
              />
            </div>

            {/* Price - Non-editable */}
            <div className="mb-3">
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                value={price}
                readOnly
                style={{ height: "30px", backgroundColor: "#e9ecef" }}
              />
            </div>

            {/* Status - Editable Dropdown */}
            <div className="mb-3">
              <label>Status:</label>
              <select
                className="form-control"
                value={machineStatus}
                onChange={(e) => setStatus(e.target.value)} // Directly set the value as a string
                style={{ height: "35px" }}
                required
              >
                <option value="Working">Working</option>
                <option value="Need Maintenance">Need Maintenance</option>
              </select>
            </div>

            {/* Submit Button */}
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
        </div>
      </div>
    </Admin>
  );
}

export default EditMachine;
