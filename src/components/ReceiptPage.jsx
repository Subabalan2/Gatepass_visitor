import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ReceiptPage.css";

const ReceiptPage = () => {
  const { approvalId } = useParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch receipt details using the approvalId
    axios
      .get(`http://localhost:3001/get-receipt/${approvalId}`)
      .then((response) => {
        setReceipt(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching receipt:", error);
        setError(
          "Failed to load receipt. It may have been deleted or expired."
        );
        setLoading(false);
      });
  }, [approvalId]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const downloadReceipt = () => {
    if (!receipt || !approvalId) return;

    // Request a PDF version of the receipt
    axios({
      url: `http://localhost:3001/download-receipt/${approvalId}`,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        // Create a blob link to download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `GatePass-${approvalId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error("Error downloading receipt:", error);
        alert("Failed to download receipt. Please try again.");
      });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (time, ampm) => {
    return `${time} ${ampm || ""}`;
  };

  if (loading) {
    return (
      <div className="receipt-container loading-container">
        <div className="loading-spinner"></div>
        <p>Loading receipt...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="receipt-container error-container">
        <div className="error-icon">❌</div>
        <h2>Error</h2>
        <p>{error}</p>
        <button className="back-button" onClick={handleBack}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="receipt-page">
      <div className="receipt-container">
        <div className="receipt-header">
          <h1>Gate Pass Receipt</h1>
          <div className="approval-id">
            <span>Approval ID: {approvalId}</span>
          </div>
        </div>

        <div className="receipt-body">
          <div className="school-info">
            <h2>School Name</h2>
            <p>School Address, City, State, ZIP</p>
          </div>

          <div className="student-info">
            <div className="info-row">
              <div className="info-item">
                <label>Student Name:</label>
                <span>{receipt.name}</span>
              </div>
              <div className="info-item">
                <label>Department:</label>
                <span>{receipt.dpmt}</span>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <label>Year:</label>
                <span>{receipt.year}</span>
              </div>
              <div className="info-item">
                <label>Date:</label>
                <span>{formatDate(receipt.date)}</span>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <label>Departure Time:</label>
                <span>{formatTime(receipt.time, receipt.ampm)}</span>
              </div>
              <div className="info-item">
                <label>Return Time:</label>
                <span>
                  {receipt.returnTime
                    ? formatTime(receipt.returnTime, receipt.returnampm)
                    : "Not specified"}
                </span>
              </div>
            </div>

            <div className="info-row full-width">
              <div className="info-item">
                <label>Purpose:</label>
                <span>{receipt.purpose}</span>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <label>Tutor Approval:</label>
                <span>{receipt.tutor}</span>
              </div>
              <div className="info-item">
                <label>HOD Approval Date:</label>
                <span>{formatDate(receipt.approvalDate)}</span>
              </div>
            </div>
          </div>

          <div className="approval-stamp">
            <div className="stamp">APPROVED</div>
          </div>

          <div className="important-note">
            <p>
              <strong>Important:</strong> This gate pass must be presented at
              the gate when leaving and returning to campus.
            </p>
          </div>
        </div>

        <div className="receipt-footer">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <button className="download-button" onClick={downloadReceipt}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
