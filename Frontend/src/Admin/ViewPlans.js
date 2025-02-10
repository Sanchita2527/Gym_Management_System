import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function ViewPlans() {
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

  const [plans, setPlans] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [planName, setPlanName] = useState("");
  const [planPrice, setPlanPrice] = useState("");

  // Add Plan
  const handleAddPlan = async (e) => {
    e.preventDefault();
    if (!planName || !planPrice) {
      toast.error("Please fill in all fields.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    const newPlan = {
      planName,
      planPrice,
    };

    try {
      await axios.post(
        "http://localhost:8080/admin/createPlan",
        newPlan,
        config
      );
      toast.success("Plan added successfully!", {
        position: "top-center",
        autoClose: 500,
      });
      setTimeout(() => {
        setPlanName("");
        setPlanPrice("");
        fetchPlans();
      }, 2000);
    } catch (error) {
      console.error("Error adding plan:", error);
      toast.error("Failed to add plan.");
    }
  };

  // Delete Plan
  const removePlan = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    try {
      await axios.delete(
        `http://localhost:8080/admin/deletePlan/${id}`,
        config
      );
      toast.success("Plan deleted successfully!", {
        position: "top-center",
        autoClose: 500,
      });
      setTimeout(() => {
        fetchPlans(); // Redirect to View Machines page
      }, 2000);
    } catch (error) {
      console.error("Error deleting plan:", error);
      toast.error("Failed to delete plan.");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    setIsFetching(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/getAllPlans",
        config
      );
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to fetch plans.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="container">
        <div className="content">
          {/* Add Plan Form */}
          <div className="form-section">
            <h3>Add Plan</h3>
            <form onSubmit={handleAddPlan}>
              <div className="form-group">
                <label>Membership Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Membership Name"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Membership Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Membership Price"
                  value={planPrice}
                  onChange={(e) => setPlanPrice(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Plan
              </button>
            </form>
          </div>

          {/* View Plans Section */}
          <div className="view-section">
            <div className="view-header">
              <h2>View Plans</h2>
            </div>
            {isFetching ? (
              <p>Loading plans...</p>
            ) : (
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Membership Name</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.planDetailsId}>
                      <td>{plan.planDetailsId}</td>
                      <td>{plan.planName}</td>
                      <td>{plan.planPrice}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            navigate(`/admin/editplan/${plan.planDetailsId}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removePlan(plan.planDetailsId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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

export default ViewPlans;
