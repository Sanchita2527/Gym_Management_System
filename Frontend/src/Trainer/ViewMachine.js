import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Trainer from "./Trainer";

function ViewMachine() {
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

  const [machines, setMachines] = useState([]);
  const trainerId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/trainer/getMachinesByTrainerId/${trainerId}`,
          config
        );
        setMachines(response.data); // Update to work with simplified state structure
      } catch (error) {
        console.error("Error fetching machines:", error);
        toast.error("Failed to fetch machine details.", {
          autoClose: 1000, // Timer in milliseconds (3 seconds)
        });
        
      }
    };

    fetchMachines();
  }, []);

  return (
    <Trainer>
      <ToastContainer />
      <div className="container">
        <div className="content">
          <div className="view-section">
            <div className="view-header">
              <h2>View Machine Details</h2>
            </div>
            <table className="table table-striped table-secondary table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {machines.length > 0 ? (
                  machines.map(({ machineId, name, price, machineStatus }) => (
                    <tr key={machineId}>
                      <td>{machineId}</td>
                      <td>{name}</td>
                      <td>{price}</td>
                      <td>{machineStatus}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() =>
                            navigate(`/trainer/editmachine/${machineId}`)
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No machine data available</td>
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
        .btn-sm {
          margin: 2px;
        }
      `}</style>
    </Trainer>
  );
}

export default ViewMachine;
