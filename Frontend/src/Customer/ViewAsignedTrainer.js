import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Customer from "./Customer";

function ViewAsignedTrainer() {
  const [data, setData] = useState({ trainers: [], isFetching: false });
  const [searchText, setSearchText] = useState("");
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

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    const fetchtrainers = async () => {
      try {
        setData((data) => ({ trainers: [], isFetching: true })); // Set loading state
        const response = await axios.get(
          "http://localhost:8080/customer/viewAsignedTrainer",
          config
        );
        console.log("Response:", response); // Check the response in the console
        if (response.data) {
          setData({ trainers: response.data, isFetching: false });
        } else {
          setData({ trainers: [], isFetching: false });
          toast.error("No data received.");
        }
      } catch (e) {
        console.error(e);
        setData((data) => ({ trainers: [], isFetching: false })); // Reset on error
        toast.error("Failed to fetch customers.");
      }
    };
    fetchtrainers();
  }, []);
  return (
    <Customer>
      <ToastContainer />
      <div className="view-section">
        <div className="view-header">
          <h2>View Trainer Details</h2>
        </div>
        <table className="table table-striped table-secondary table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Time Slot</th>
            </tr>
          </thead>
          <tbody>
            {data.trainers
              .filter((val) => {
                if (!searchText) return true;
                return (
                  val.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  val.email.toLowerCase().includes(searchText.toLowerCase())
                );
              })
              .map(({ id, name, mobile, email, gender, timeSlot }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{mobile}</td>
                  <td>{email}</td>
                  <td>{gender}</td>
                  <td>{timeSlot}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Customer>
  );
}

export default ViewAsignedTrainer;
