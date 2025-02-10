import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Admin from "./Admin";

function ViewCustomer() {
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

  const [data, setData] = useState({ customers: [], isFetching: false });
  const [searchText, setSearchText] = useState(""); // State for search text

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    fetchcustomers();
  }, []);


  const fetchcustomers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      setData((data) => ({ customers: [], isFetching: true })); // Set loading state
      const response = await axios.get(
        "http://localhost:8080/admin/getAllCustomers",
        config
      );
      console.log("Response:", response); // Check the response in the console
      if (response.data) {
        setData({ customers: response.data, isFetching: false });
      } else {
        setData({ customers: [], isFetching: false });
        toast.error("No data received.");
      }
    } catch (e) {
      console.error(e);
      setData((data) => ({ customers: [], isFetching: false })); // Reset on error
      toast.error("Failed to fetch customers.");
    }
  };

  const removeCustomer = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    axios
      .delete(`http://localhost:8080/admin/deletecustomer/${id}`, config)
      .then((response) => {
        toast.success("Customer deleted successfully!", {
          position: "top-center",
          autoClose: 500,
        });
        setTimeout(() => {
          fetchcustomers(); // Redirect to View Trainers page
        }, 2000);
      })
      .catch((error) => {
        toast.error("Something Went Wrong !!!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        alert("Error!!!");
      });
    navigate("/admin/viewcustomer");
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="view-container">
        <h2 className="text-center">View Customers Details</h2>

        {/* Search input */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by customer name..."
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <table className="table table-striped table-secondary table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Membership</th>
              <th>Membership Period</th>
              <th>Start Date</th>
              <th>Trainer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.customers
              .filter((customer) => {
                if (searchText === "") {
                  return true; // If searchText is empty, show all customers
                }
                return customer.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase()); // Filter by name
              })
              .map(
                ({
                  customerId,
                  name,
                  mobileNumber,
                  email,
                  gender,
                  membership,
                  period,
                  startDate,
                  trainerName,
                }) => (
                  <tr key={customerId}>
                    <td>{customerId}</td>
                    <td>{name}</td>
                    <td>{mobileNumber}</td>
                    <td>{email}</td>
                    <td>{gender}</td>
                    <td>{membership}</td>
                    <td>{period}</td>
                    <td>{startDate}</td>
                    <td>{trainerName}</td>
                    <td>
                      <button
                        className="button border-white"
                        onClick={() => removeCustomer(customerId)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewCustomer;
