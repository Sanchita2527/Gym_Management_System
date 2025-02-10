import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Admin from "./Admin";

function ViewAllMachines() {
    const navigate = useNavigate();

    useEffect(() => {
      if (!sessionStorage.getItem("userName")) {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "MEMBER") {
        navigate("/customer");
      }
        else if (sessionStorage.getItem("userRole") === "TRAINER") {
            navigate("/trainer");
          }
       else if (sessionStorage.getItem("userRole") === "ADMIN") {
        navigate("/admin");
      }
    }, [navigate]);
  const [data, setData] = useState({ machines: [] });
  const [trainers, setTrainers] = useState([]);
  const [name, setMachineName] = useState("");
  const [price, setMachinePrice] = useState("");
  const [trainnerId, setSelectedTrainerId] = useState(""); // State for selected trainer ID


  // Flag to prevent duplicate toasts
  const toastDisplayedRef = useRef(false);

  // Fetch trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          "http://localhost:8080/admin/getAllTrainers", config
        );
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };
    fetchTrainers();
  }, []);

  // Fetch machines
  const fetchMachines = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      const response = await axios.get(
        "http://localhost:8080/admin/getAllMachines",config
      );
      setData({ machines: response.data });
    } catch (error) {
      console.error("Error fetching machines:", error);
      setData({ machines: [] });
      if (!toastDisplayedRef.current) {
       
        toastDisplayedRef.current = true; // Prevent multiple toasts
      }
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  // Add Machine
  const handleAddMachine = async (e) => {
    e.preventDefault();
    if (!name || !price || !trainnerId) {
      toast.error("Please fill all fields before adding the machine.");
      return;
    }

    const payload = {
      trainnerId, // Trainer ID captured from the dropdown
      name,
      price,
      machineStatus: 'Working', // Optional
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      await axios.post(
        "http://localhost:8080/admin/addMachine",
        payload,
        config
      );
    
      // Show success toast
      toast.success("Machine added successfully!", {
        position: "top-center",
        autoClose: 500, // Toast will auto-close after 500ms
      });
    
      // Reset form fields and fetch updated machine data after the toast
      setTimeout(() => {
        setMachineName("");
        setMachinePrice("");
        setSelectedTrainerId("");
        fetchMachines(); // Fetch updated machine list
      }, 2000); // Match the autoClose duration of the toast
    } catch (error) {
      // Log the error for debugging
      console.error("Error in adding machine:", error);
    
      // Show error toast
      toast.error("Failed to add machine. Please try again.", {
        position: "top-center",
        autoClose: 500,
      });
    }
  };
    

  // Delete Machine
  const removeMachine = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    try {
      await axios.delete(
        `http://localhost:8080/admin/deleteMachine/${id}`,
        config
      );
       toast.success("Machine deleted successfully!", {
                position: "top-center",
                autoClose: 500,
              });
              setTimeout(() => {
                fetchMachines();// Redirect to View Machines page
              }, 2000); 
     
    } catch (error) {
      console.error("Error deleting machine:", error);
      toast.error("Failed to delete machine. Please try again.");
    }
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="container">
        <div className="content">
          {/* Add Machine Form */}
          <div
            className="form-section"
            style={{
              backgroundColor: "#1e1c1c",
              color: "white",
              minHeight: "50vh",
              maxHeight: "50vh"
            }}
          >
            <h3>Add Machine</h3>
            <form className="form" onSubmit={handleAddMachine}>
              <div className="form-group">
                <label>Machine Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Machine Name"
                  value={name}
                  onChange={(e) => setMachineName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Machine Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Machine Price"
                  value={price}
                  onChange={(e) => setMachinePrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Assign Trainer</label>
                <select
                  className="form-control"
                  value={trainnerId}
                  onChange={(e) => setSelectedTrainerId(e.target.value)}
                  required
                >
                  <option value="">Select Trainer</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.trainnerId} value={trainer.trainnerId}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-primary"
                style={{ backgroundColor: "#aeff00" }}
                type="submit"
              >
                Add Machine
              </button>
            </form>
          </div>

          {/* View Machines Section */}
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
                  <th>Trainer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.machines.length > 0 ? (
                  data.machines.map(
                    ({ id, machinename, price, machineStatus, name }) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{machinename}</td>
                        <td>{price}</td>
                        <td>{machineStatus}</td>
                        <td>{name}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() =>
                              navigate(`/admin/editmachine/${id}`)
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeMachine(id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )
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
          border-radius: 4px;
        }
        .btn-primary {
          background: #aeff00;
          border: none;
        }
        .view-section {
          flex: 3;
        }
        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
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
    </Admin>
  );
}


export default ViewAllMachines;
