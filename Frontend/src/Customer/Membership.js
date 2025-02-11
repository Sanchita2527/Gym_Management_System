import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Customer from "./Customer";

function Membership() {
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

  const [trainers, setTrainers] = useState([]); // State for trainers
  const [membership, setMembership] = useState([]); //State for membership
  const [plans, setPlans] = useState([]); // State for membership plans
  const [timeslot, setTimeslot] = useState(""); // State for timeslot
  const [selectedPlanPrice, setSelectedPlanPrice] = useState(0); // State for selected plan price
  const [totalPrice, setTotalPrice] = useState(0); // State for total price (calculated based on plan and period)

  const customerId = sessionStorage.getItem("userId");

  // Fetch membership plans
  const fetchPlans = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      const response = await axios.get(
        "http://localhost:8080/customer/getAllPlans",config
      );
      setPlans(response.data); // Assuming the response is an array of plans
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const fetchMembership = async () => {
    try {
      const customerId = sessionStorage.getItem("userId");
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/customer/getMembershipDetailsByCustomerId/${customerId}`,
        config
      );
      setMembership(response.data);
    } catch (error) {
      console.error("Error in fetching the membership details");
    }
  };

  // Fetch trainers based on selected timeslot
  const fetchTrainers = async (selectedTimeslot) => {
    if (selectedTimeslot) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          `http://localhost:8080/customer/getTrainnersByTimeSlot/${selectedTimeslot}`,config
        );
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
        toast.warn("Trainer is not present select another time slot.", {
          autoClose: 2000, // 2 seconds for the toast to disappear
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Reload after 2 seconds (matching the toast duration)
        
      }
    }
  };

  // Trigger fetch when timeslot changes
  useEffect(() => {
    if (timeslot) {
      fetchTrainers(timeslot);
    } else {
      setTrainers([]); // Clear trainer list if no timeslot is selected
    }
  }, [timeslot]); // Dependency array to re-fetch when timeslot changes

    // Trigger fetch when timeslot changes
    useEffect(() => {
      fetchPlans(); // Fetch plans when the component mounts
      fetchMembership();
      fetchTrainers();
    }, []);

  const formik = useFormik({
    initialValues: {
      planName: "",
      period: "",
      timeslot: "",
      trainnerId: "", // To store selected trainer ID
    },
    validationSchema: Yup.object({
      planName: Yup.string().required("Membership plan is required."),
      period: Yup.string().required("Membership period is required."),
      timeslot: Yup.string().required("Timeslot is required."),
      trainnerId: Yup.string().required("Trainer selection is required."),
    }),
    onSubmit: async (values, { resetForm }) => {
      const periodString = `${values.period} months`; // Map period to string
  
      // Prepare the query parameters
      const paymentData = {
        customerId: sessionStorage.getItem("userId"),
        trainerId: values.trainnerId,
        planName: values.planName,
        period: periodString,
        totalPrice: totalPrice,
        timeslot: values.timeslot,
      };
    
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
    
      try {
        
        // Make a POST request with query parameters
        // const response = await axios.post(
        //   `http://localhost:8080/customer/buyMembership?${params.toString()}`,
        //   null, // No body data is sent, query parameters are in the URL
        //   config
        // );
    
        toast.success("Booking confirmed! Redirecting to payment page...");
        setTimeout(() => {
          navigate("/customer/payment", { state: paymentData });
        }, 2000);
    
        resetForm(); // Reset the form after successful submission
      } catch (error) {
        console.error("Error confirming booking:", error.response || error);
        toast.error("Failed to confirm booking. Please try again.");
      }
    },
  });

  // Handle plan selection and calculate total price
  const handlePlanChange = (e) => {
    console.log("plan change called " + e.target.value);
    const selectedPlan = e.target.value;
    const plan = plans.find((plan) => plan.planName === selectedPlan);
    console.log(plan);
    if (plan) {
      setSelectedPlanPrice(plan.planPrice); // Set price of the selected plan
      calculateTotalPrice(plan.planPrice, formik.values.period); // Calculate total price when plan is selected
    }
    formik.handleChange(e);
  };

  // Handle period selection and update total price
  const handlePeriodChange = (e) => {
    console.log("period change called " + e.target.value);
    const selectedPeriod = e.target.value;
    setTotalPrice(selectedPeriod * selectedPlanPrice); // Calculate total price based on period
    formik.handleChange(e);
  };

  // Calculate total price based on selected plan price and period
  const calculateTotalPrice = (price, period) => {
    if (period) {
      setTotalPrice(price * period);
    } else {
      setTotalPrice(0);
    }
  };

  return (
    <Customer>
      <ToastContainer />
      <div className="container">
        <div className="content">
          <div
            className="form-section"
            style={{
              backgroundColor: "#1e1c1c",
              color: "white",
              minHeight: "50vh",
            }}
          >
            <h3>Get Membership</h3>
            <form className="form" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Membership Plan</label>
                <select
                  name="planName"
                  className="form-control"
                  value={formik.values.planName}
                  onChange={handlePlanChange} // Using handlePlanChange for plan selection
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select Plan</option>
                  {plans.map((plan) => (
                    <option key={plan.planId} value={plan.planName}>
                      {plan.planName}
                    </option>
                  ))}
                </select>
                {formik.touched.planName && formik.errors.planName ? (
                  <div className="error">{formik.errors.planName}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label>Membership Period</label>
                <select
                  name="period"
                  className="form-control"
                  value={formik.values.period}
                  onChange={handlePeriodChange} // Using handlePeriodChange to update the price
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select Period</option>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                </select>
                {formik.touched.period && formik.errors.period ? (
                  <div className="error">{formik.errors.period}</div>
                ) : null}
              </div>

              {totalPrice > 0 && (
                <div className="form-group">
                  <label>Total Price</label>
                  <input
                    type="text"
                    className="form-control"
                    value={`${totalPrice}`}
                    readOnly
                  />
                </div>
              )}

              <div className="form-group">
                <label>Time Slot</label>
                <select
                  name="timeslot"
                  className="form-control"
                  value={formik.values.timeslot}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setTimeslot(e.target.value); // Update timeslot state on change
                  }}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select Time Slot</option>
                  <option value="6AM-8AM">6AM-8AM</option>
                  <option value="8AM-10AM">8AM-10AM</option>
                  <option value="10AM-12PM">10AM-12PM</option>
                  <option value="4PM-6PM">4PM-6PM</option>
                  <option value="6PM-8PM">6PM-8PM</option>
                  <option value="8PM-10PM">8PM-10PM</option>
                </select>
                {formik.touched.timeslot && formik.errors.timeslot ? (
                  <div className="error">{formik.errors.timeslot}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label>Trainer</label>
                <select
                  name="trainnerId"
                  className="form-control"
                  value={formik.values.trainnerId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select Trainer</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.trainnerId} value={trainer.trainnerId}>
                      {trainer.name}
                    </option>
                  ))}
                </select>
                {formik.touched.trainnerId && formik.errors.trainnerId ? (
                  <div className="error">{formik.errors.trainnerId}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: "#aeff00" }}
              >
                Payment
              </button>
            </form>
          </div>

          <div className="view-section">
            <div className="view-header">
              <h2>View Membership Details</h2>
            </div>
            <table className="table table-striped table-secondary table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>Plan</th>
                  <th>Period</th>
                  <th>Start Date</th>
                  <th>Trainer</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {membership && membership.length > 0 ? (
                  membership.map((mem) => (
                    <tr key={mem.membershipId}>
                      <td>{mem.membershipId}</td>
                      <td>{mem.planname}</td>
                      <td>{mem.period}</td>
                      <td>{mem.startDate}</td>
                      <td>{mem.trainerName}</td>
                      <td>{mem.totalPrice}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No membership details found.
                    </td>
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
          margin: 0 auto;
          padding: 5px;
        }
        .content {
          display: flex;
          flex-direction: row;
          gap: 20px;
        }
        .form-section {
          flex: 1;
          max-width: 25%;
          background: #f8f9fa;
          padding: 15px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .form-section h3 {
          text-align: center;
          margin-bottom: 15px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-control {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .btn-primary {
          width: 100%;
        }
        .view-section {
          flex: 3;
        }
        .view-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          font-size: 0.9rem;
        }
        th,
        td {
          text-align: center;
        }
        .error {
          color: red;
          font-size: 0.8rem;
          margin-top: 5px;
        }
      `}</style>
    </Customer>
  );
}

export default Membership;
