import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
function DashBoard() {
  const navigate = useNavigate();
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const handleNewGatepass = () => {
    navigate("/gatepass");
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-content">
            <span className="card-title">New Gatepass Applied</span>
            <button className="card-button" onClick={handleNewGatepass}>
              Apply
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <span className="card-title">Pending Gatepass List</span>
            <button
              className="card-button"
              onClick={() => setShowPendingModal(true)}
            >
              View
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <span className="card-title">Completed Gatepass List</span>
            <button
              className="card-button"
              onClick={() => setShowCompletedModal(true)}
            >
              View
            </button>
          </div>
        </div>
      </div>

      {/* Pending Gatepass Modal */}
      {showPendingModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Pending Gatepass List</h2>
            <table className="modal-table">
              <thead>
                <tr>
                  <th>Gatepass ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pending Gatepass 1</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>Pending Gatepass 2</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>Pending Gatepass 3</td>
                  <td>Pending</td>
                </tr>
              </tbody>
            </table>
            <button
              className="modal-close-button"
              onClick={() => setShowPendingModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Completed Gatepass Modal */}
      {showCompletedModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Completed Gatepass List</h2>
            <table className="modal-table">
              <thead>
                <tr>
                  <th>Gatepass ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Completed Gatepass 1</td>
                  <td>Completed</td>
                </tr>
                <tr>
                  <td>Completed Gatepass 2</td>
                  <td>Completed</td>
                </tr>
                <tr>
                  <td>Completed Gatepass 3</td>
                  <td>Completed</td>
                </tr>
              </tbody>
            </table>
            <button
              className="modal-close-button"
              onClick={() => setShowCompletedModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
