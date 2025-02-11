import React from "react";
import axios from "axios";
import Customer from "./Customer";
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import { ToastContainer, toast } from "react-toastify";

function DietPlan() {
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

  const customerId = sessionStorage.getItem("userId");

  const handleDownload = async () => {
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      //   },
      // };
      // const response = await axios.get(
      //   `http://localhost:8080/customer/download/${customerId}`, config,
      //   {
      //     responseType: "blob", // Indicate that the response is a file
      //   }
      // );
      const response = await axios.get(
        `http://localhost:8080/customer/download/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
          responseType: "blob", // Ensure response is treated as a file
        }
      );

      // Create a download link for the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Set the filename for the download
      const contentDisposition = response.headers["content-disposition"];
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1]
        : `${customerId}.pdf`;

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Diet plan downloaded successfully!");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download diet plan.");
    }
  };

  return (
    <Customer>
      <ToastContainer />
      <div className="diet-plan-container">
        {/* Section for the Image */}
        <div className="image-section">
          <img src="/assests/dietplan.jpg" alt="diet" className="diet-image" />
        </div>
        {/* Section for the Button */}
        <div className="download-section">
          <button className="download-button" onClick={handleDownload}>
            Download Your Personalized Diet Plan
          </button>
        </div>
      </div>
      <style jsx>{`
        .diet-plan-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px;
        }
        .image-section {
          margin-bottom: 20px;
        }
        .diet-image {
          width: 500px;
          height: auto;
          border-radius: 10px;
        }
        .download-section {
          text-align: center;
        }
        .download-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
        }
        .download-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </Customer>
  );
}

export default DietPlan;
