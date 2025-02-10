import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Admin from "./Admin";

function ViewPayment() {
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

  const [payments, setPayments] = useState([]);

  // Fetch all payments
  const fetchAllPayments = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      const response = await axios.get(
        "http://localhost:8080/admin/getAllPayments",
        config
      );
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      alert("Failed to fetch payments. Please try again.");
    }
  };

  // Fetch all payments on component mount
  useEffect(() => {
    fetchAllPayments();
  }, []);

  return (
    <Admin>
      <div className="container-fluid">
        <h2 className="text-center my-4">View Payments</h2>
        <table className="table table-striped table-secondary table-hover">
          <thead className="table-dark">
            <tr>
              <th>Customer Name</th>
              <th>Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(({ id, name, totalamount, paymentDate }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{totalamount}</td>
                <td>{paymentDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewPayment;
