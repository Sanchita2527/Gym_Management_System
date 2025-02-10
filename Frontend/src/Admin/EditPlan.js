import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function EditPlan() {
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

  const { id } = useParams();

  const [planName, setMembershipName] = useState("");
  const [planPrice, setMembershipPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const editUrl = `http://localhost:8080/admin/getPlanById/${id}`;
  const updateUrl = `http://localhost:8080/admin/updatePlan/${id}`;

  // Fetch plan details
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get(editUrl, config)
      .then((response) => {
        const { planName, planPrice } = response.data;
        setMembershipName(planName || "");
        setMembershipPrice(planPrice || "");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching plan details:", error);
        toast.error("Failed to fetch plan details.");
        setIsLoading(false);
      });
  }, [editUrl]);

  // Handle form submission
  const handleSubmit = (e) => {
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

    axios
      .put(updateUrl, { planName, planPrice }, config)
      .then(() => {
        toast.success("Plan updated successfully!");
        setTimeout(() => {
          navigate("/admin/viewplans"); // Redirect to View Plans page
        }, 2000); // 2-second delay to show toast
      })
      .catch((error) => {
        console.error("Error updating plan:", error);
        toast.error("Failed to update plan.");
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
          <h2 className="text-center mb-4">Edit Plan</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Membership Name:</label>
              <input
                type="text"
                className="form-control"
                value={planName}
                onChange={(e) => setMembershipName(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            <div className="mb-3">
              <label>Membership Price:</label>
              <input
                type="number"
                className="form-control"
                value={planPrice}
                onChange={(e) => setMembershipPrice(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#aeff00" }}
              >
                Update Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default EditPlan;
