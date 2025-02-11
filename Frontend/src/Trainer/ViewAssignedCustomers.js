import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Trainer from "./Trainer";

function ViewAssignedCustomers() {
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

  const [customers, setCustomers] = useState([]);
  const trainerId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/trainer/getCustomersByTrainerId/${trainerId}`,config
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to fetch customer details.");
      }
    };
    fetchCustomers();
  }, []);

  const handleFileUpload = async (file, customerId) => {
    if (!file) {
      toast.error("Please select a file before uploading.");
      return;
    }

    const allowedExtensions = ["application/pdf", "application/msword"];
    if (!allowedExtensions.includes(file.type)) {
      toast.error("Only .pdf and .doc files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      const response = await axios.post(
        `http://localhost:8080/trainer/uploadDietPlan/${customerId}`,
        formData,
        config,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success(
          `Diet plan uploaded successfully for customer ${customerId}`
        );
      } else {
        toast.error(`Failed to upload diet plan for customer ${customerId}`);
      }
    } catch (error) {
      console.error("Error uploading diet plan:", error);
      toast.error("Failed to upload diet plan.");
    }
  };

  return (
    <Trainer>
      <ToastContainer />
      <div className="container">
        <div className="content">
          <div className="view-section">
            <div className="view-header">
              <h2>View Customer Details</h2>
            </div>
            <table className="table table-striped table-secondary table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map(
                    ({ customerId, name, email, gender, contact }) => (
                      <tr key={customerId}>
                        <td>{customerId}</td>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{gender}</td>
                        <td>{contact}</td>
                        <td>
                          <label
                            className="upload-label"
                            htmlFor={`file-${customerId}`}
                          >
                            Choose File
                          </label>
                          <input
                            id={`file-${customerId}`}
                            type="file"
                            accept=".pdf,.doc"
                            onChange={(e) =>
                              handleFileUpload(e.target.files[0], customerId)
                            }
                          />
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="6">No customer data available</td>
                  </tr>
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
        .view-section {
          flex: 3;
        }
        .view-header {
          margin-bottom: 15px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          text-align: center;
          padding: 8px;
        }
        .upload-label {
          display: inline-block;
          background-color: #007bff;
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          margin-right: 10px;
        }
        .upload-label:hover {
          background-color: #0056b3;
        }
        input[type="file"] {
          display: none;
        }
      `}</style>
    </Trainer>
  );
}

export default ViewAssignedCustomers;
