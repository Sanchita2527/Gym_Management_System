import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Payment() {
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

  const location = useLocation();
  const paymentData = location.state;

  // Extract total price from state passed via navigation
  const totalPrice = paymentData?.totalPrice || 0;

  // State for card details
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handlePayment = async () => {
    if (!cardNumber || !cvv || !expiryDate) {
      toast.error("Please fill all payment details.");
      return;
    }

    const Id = sessionStorage.getItem("userId");

    try {
      const payload = {
        totalPrice: totalPrice,
      };

      // Add your JWT token here, if it's required for authentication
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      // Call backend API for payment
      await axios.post(
        `http://localhost:8080/customer/makePayment/${Id}`,
        payload,
        config
      );

      const params = new URLSearchParams(paymentData).toString();
      const response = await axios.post(
        `http://localhost:8080/customer/buyMembership?${params}`,
        null, 
        config
      );

      toast.success("Payment successfull!", {
        position: "top-center",
        autoClose: 500, // Toast will auto-close after 500ms
      });
      setTimeout(() => {
        navigate("/customer/membership"); // Redirect to View Machines page
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1c1c",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <ToastContainer/>
      <div className="container my-5">
        <h2
          className="text-center mb-4"
          style={{ fontWeight: "bold", color: " #aeff00" }}
        >
          Payment Page
        </h2>

        <div
          className="card mx-auto"
          style={{
            maxWidth: "500px",
            padding: "20px",
            backgroundColor: "#333",
            color: " #aeff00",
          }}
        >
          <h4>Total Price: ₹{totalPrice}</h4>

          <div className="mb-3">
            <label
              htmlFor="cardNumber"
              className="form-label"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="form-control"
              placeholder="Enter your card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="cvv"
              className="form-label"
              style={{ fontWeight: "bold", color: "white" }}
            >
              CVV
            </label>
            <input
              type="password"
              id="cvv"
              className="form-control"
              placeholder="Enter CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="expiryDate"
              className="form-label"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Expiry Date
            </label>
            <input
              type="month"
              id="expiryDate"
              className="form-control"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={handlePayment}
            style={{
              fontWeight: "bold",
              backgroundColor: "#aeff00",
              color: "black",
            }}
          >
            Proceed Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
