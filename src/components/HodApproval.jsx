

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/hodapproval.css";

// const HodApproval = () => {
//   const [gatePasses, setGatePasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [approvedCount, setApprovedCount] = useState(0);
//   const [todayApprovedCount, setTodayApprovedCount] = useState(0);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     alert("Logging out...");
//     localStorage.clear();
//     navigate("/");
//   };

//   const isToday = (someDate) => {
//     const today = new Date();
//     const date = new Date(someDate);
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   const fetchHodGatePasses = () => {
//     setLoading(true);
//     axios
//       .get("http://localhost:3001/get-hod-gatepasses")
//       .then((response) => {
//         setGatePasses(response.data);
//         setLoading(false);
//         // Resetting counts to 0 since we are handling them manually on approval
//         setApprovedCount(0);
//         setTodayApprovedCount(0);
//       })
//       .catch((error) => {
//         console.error("Error fetching HOD gate pass details:", error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchHodGatePasses();
//   }, []);

//   // const handleHodApproval = (id, status) => {
//   //   setLoading(true);
//   //   axios
//   //     .post("http://localhost:3001/hod-approval", { id, status })
//   //     .then(() => {
//   //       // Update counts manually
//   //       if (status === "Approved") {
//   //         setApprovedCount((prev) => prev + 1);
//   //         const approvedPass = gatePasses.find((pass) => pass._id === id);
//   //         if (approvedPass && isToday(approvedPass.date)) {
//   //           setTodayApprovedCount((prev) => prev + 1);
//   //         }
//   //         alert("Gate pass finally approved. Student notified.");
//   //       } else {
//   //         alert("Gate pass disapproved. Record deleted and student notified.");
//   //       }

//   //       // Remove the approved or rejected pass from local list
//   //       setGatePasses((prevPasses) =>
//   //         prevPasses.filter((pass) => pass._id !== id)
//   //       );
//   //       setLoading(false);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error updating HOD approval status:", error);
//   //       setLoading(false);
//   //     });
//   // };
//   const handleHodApproval = (id, status) => {
//     setLoading(true);
//     axios
//       .post("http://localhost:3001/hod-approval", { id, status })
//       .then(() => {
//         if (status === "Approved") {
//           setApprovedCount((prev) => prev + 1);

//           // ✅ Use current time for checking if today
//           const now = new Date();
//           if (isToday(now)) {
//             setTodayApprovedCount((prev) => prev + 1);
//           }

//           alert("Gate pass finally approved. Student notified.");
//         } else {
//           alert("Gate pass disapproved. Record deleted and student notified.");
//         }

//         // Remove approved or rejected pass from local list
//         setGatePasses((prevPasses) =>
//           prevPasses.filter((pass) => pass._id !== id)
//         );
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error updating HOD approval status:", error);
//         setLoading(false);
//       });
//   };


//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="approval-page hod-theme">
//       <div className="approval-header">
//         <h1>HOD Gate Pass Approval</h1>
//         <p>Final review of tutor-approved gate passes</p>
//       </div>

//       <div className="approval-container">
//         <div className="stats-container">
//           <div className="stat-card">
//             <h3>Pending</h3>
//             <div className="stat-value">{gatePasses.length}</div>
//           </div>
//           <div className="stat-card">
//             <h3>Today's Passes</h3>
//             <div className="stat-value">{todayApprovedCount}</div>
//           </div>
//           <div className="stat-card">
//             <h3>Approved</h3>
//             <div className="stat-value">{approvedCount}</div>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header">
//             <h2>Awaiting Final Approval</h2>
//             <button className="refresh-btn" onClick={fetchHodGatePasses}>
//               Refresh
//             </button>
//           </div>

//           {loading ? (
//             <div className="loading">Loading gate pass requests...</div>
//           ) : (
//             <div className="table-responsive">
//               <table className="approval-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Department</th>
//                     <th>Year</th>
//                     <th>Purpose</th>
//                     <th>Date</th>
//                     <th>Departure</th>
//                     <th>Return</th>
//                     <th>Tutor</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {gatePasses.length > 0 ? (
//                     gatePasses.map((pass) => (
//                       <tr key={pass._id}>
//                         <td className="name-cell">{pass.name}</td>
//                         <td>{pass.dpmt}</td>
//                         <td>{pass.year}</td>
//                         <td className="purpose-cell">{pass.purpose}</td>
//                         <td>{formatDate(pass.date)}</td>
//                         <td>{`${pass.time}`}</td>
//                         <td>
//                           {pass.returnTime
//                             ? `${pass.returnTime} ${pass.returnampm || ""}`
//                             : "Not specified"}
//                         </td>
//                         <td>{pass.tutor}</td>
//                         <td className="action-buttons">
//                           <button
//                             className="approve-btn"
//                             onClick={() =>
//                               handleHodApproval(pass._id, "Approved")
//                             }
//                             disabled={loading}
//                           >
//                             ✅ Approve
//                           </button>
//                           <button
//                             className="disapprove-btn"
//                             onClick={() =>
//                               handleHodApproval(pass._id, "Disapproved")
//                             }
//                             disabled={loading}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="16"
//                               height="16"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <line x1="18" y1="6" x2="6" y2="18"></line>
//                               <line x1="6" y1="6" x2="18" y2="18"></line>
//                             </svg>
//                             Reject
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="9" className="no-data">
//                         No pending gate passes for HOD approval
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         <div className="approval-footer">
//           <div className="footer-content">
//             <span>Gate Pass Management System — hodApproval Portal</span>
//             <button className="logout-btn" onClick={handleLogout}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//                 <polyline points="16 17 21 12 16 7"></polyline>
//                 <line x1="21" y1="12" x2="9" y2="12"></line>
//               </svg>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HodApproval;


//new code

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/hodapproval.css";
// import GatepassReceipt from './GatepassReceipt';

// const HodApproval = () => {
//   const [gatePasses, setGatePasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [approvedCount, setApprovedCount] = useState(0);
//   const [todayApprovedCount, setTodayApprovedCount] = useState(0);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [approvedPass, setApprovedPass] = useState(null);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     alert("Logging out...");
//     localStorage.clear();
//     navigate("/");
//   };

//   const isToday = (someDate) => {
//     const today = new Date();
//     const date = new Date(someDate);
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   const fetchHodGatePasses = () => {
//     setLoading(true);
//     axios
//       .get("http://localhost:3001/get-hod-gatepasses")
//       .then((response) => {
//         setGatePasses(response.data);
//         setLoading(false);
//         // Resetting counts to 0 since we are handling them manually on approval
//         setApprovedCount(0);
//         setTodayApprovedCount(0);
//       })
//       .catch((error) => {
//         console.error("Error fetching HOD gate pass details:", error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchHodGatePasses();
//   }, []);

//   const handleHodApproval = (id, status) => {
//     setLoading(true);

//     // Find the gate pass before removing it from the list
//     const passToApprove = gatePasses.find((pass) => pass._id === id);

//     axios
//       .post("http://localhost:3001/hod-approval", { id, status })
//       .then((response) => {
//         if (status === "Approved") {
//           setApprovedCount((prev) => prev + 1);

//           // Use current time for checking if today
//           const now = new Date();
//           if (isToday(now)) {
//             setTodayApprovedCount((prev) => prev + 1);
//           }

//           // Set the approved pass with receipt information
//           setApprovedPass({
//             ...passToApprove,
//             approvalDate: new Date().toISOString(),
//             approvalId:
//               response.data.approvalId ||
//               `AP-${Math.floor(Math.random() * 10000)}`,
//             status: "Approved",
//           });

//           // Show receipt
//           setShowReceipt(true);
//         } else {
//           alert("Gate pass disapproved. Record deleted and student notified.");
//         }

//         // Remove approved or rejected pass from local list
//         setGatePasses((prevPasses) =>
//           prevPasses.filter((pass) => pass._id !== id)
//         );
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error updating HOD approval status:", error);
//         setLoading(false);
//       });
//   };

//   const closeReceipt = () => {
//     setShowReceipt(false);
//     setApprovedPass(null);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="approval-page hod-theme">
//       {showReceipt && approvedPass && (
//         <GatepassReceipt
//           pass={approvedPass}
//           onClose={closeReceipt}
//           printReceipt={() => window.print()}
//         />
//       )}

//       <div className="approval-header">
//         <h1>HOD Gate Pass Approval</h1>
//         <p>Final review of tutor-approved gate passes</p>
//       </div>

//       <div className="approval-container">
//         <div className="stats-container">
//           <div className="stat-card">
//             <h3>Pending</h3>
//             <div className="stat-value">{gatePasses.length}</div>
//           </div>
//           <div className="stat-card">
//             <h3>Today's Passes</h3>
//             <div className="stat-value">{todayApprovedCount}</div>
//           </div>
//           <div className="stat-card">
//             <h3>Approved</h3>
//             <div className="stat-value">{approvedCount}</div>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header">
//             <h2>Awaiting Final Approval</h2>
//             <button className="refresh-btn" onClick={fetchHodGatePasses}>
//               Refresh
//             </button>
//           </div>

//           {loading ? (
//             <div className="loading">Loading gate pass requests...</div>
//           ) : (
//             <div className="table-responsive">
//               <table className="approval-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Department</th>
//                     <th>Year</th>
//                     <th>Purpose</th>
//                     <th>Date</th>
//                     <th>Departure</th>
//                     <th>Return</th>
//                     <th>Tutor</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {gatePasses.length > 0 ? (
//                     gatePasses.map((pass) => (
//                       <tr key={pass._id}>
//                         <td className="name-cell">{pass.name}</td>
//                         <td>{pass.dpmt}</td>
//                         <td>{pass.year}</td>
//                         <td className="purpose-cell">{pass.purpose}</td>
//                         <td>{formatDate(pass.date)}</td>
//                         <td>{`${pass.time}`}</td>
//                         <td>
//                           {pass.returnTime
//                             ? `${pass.returnTime} ${pass.returnampm || ""}`
//                             : "Not specified"}
//                         </td>
//                         <td>{pass.tutor}</td>
//                         <td className="action-buttons">
//                           <button
//                             className="approve-btn"
//                             onClick={() =>
//                               handleHodApproval(pass._id, "Approved")
//                             }
//                             disabled={loading}
//                           >
//                             ✅ Approve
//                           </button>
//                           <button
//                             className="disapprove-btn"
//                             onClick={() =>
//                               handleHodApproval(pass._id, "Disapproved")
//                             }
//                             disabled={loading}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="16"
//                               height="16"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <line x1="18" y1="6" x2="6" y2="18"></line>
//                               <line x1="6" y1="6" x2="18" y2="18"></line>
//                             </svg>
//                             Reject
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="9" className="no-data">
//                         No pending gate passes for HOD approval
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         <div className="approval-footer">
//           <div className="footer-content">
//             <span>Gate Pass Management System — hodApproval Portal</span>
//             <button className="logout-btn" onClick={handleLogout}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//                 <polyline points="16 17 21 12 16 7"></polyline>
//                 <line x1="21" y1="12" x2="9" y2="12"></line>
//               </svg>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HodApproval;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/hodapproval.css";
// import GatepassReceipt from './GatepassReceipt';

// const HodApproval = () => {
//   const [gatePasses, setGatePasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [approvedCount, setApprovedCount] = useState(0);
//   const [todayApprovedCount, setTodayApprovedCount] = useState(0);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [approvedPass, setApprovedPass] = useState(null);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     alert("Logging out...");
//     localStorage.clear();
//     navigate("/");
//   };

//   const isToday = (someDate) => {
//     const today = new Date();
//     const date = new Date(someDate);
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   const fetchHodGatePasses = () => {
//     setLoading(true);
//     axios
//       .get("http://localhost:3001/get-hod-gatepasses")
//       .then((response) => {
//         setGatePasses(response.data);
//         setLoading(false);
//         // Resetting counts to 0 since we are handling them manually on approval
//         setApprovedCount(0);
//         setTodayApprovedCount(0);
//       })
//       .catch((error) => {
//         console.error("Error fetching HOD gate pass details:", error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchHodGatePasses();
//   }, []);

//   const handleHodApproval = (id, status) => {
//     setLoading(true);
    
//     // Find the gate pass before removing it from the list
//     const passToApprove = gatePasses.find((pass) => pass._id === id);
    
//     axios
//       .post("http://localhost:3001/hod-approval", { id, status })
//       .then((response) => {
//         if (status === "Approved") {
//           setApprovedCount((prev) => prev + 1);

//           // Use current time for checking if today
//           const now = new Date();
//           if (isToday(now)) {
//             setTodayApprovedCount((prev) => prev + 1);
//           }

//           // Set the approved pass with receipt information and email status
//           setApprovedPass({
//             ...passToApprove,
//             approvalDate: new Date().toISOString(),
//             approvalId: response.data.approvalId || `AP-${Math.floor(Math.random() * 10000)}`,
//             status: "Approved"
//           });
          
//           // Show receipt
//           setShowReceipt(true);
//         } else {
//           alert("Gate pass disapproved. Record deleted and student notified.");
//         }

//         // Remove approved or rejected pass from local list
//         setGatePasses((prevPasses) =>
//           prevPasses.filter((pass) => pass._id !== id)
//         );
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error updating HOD approval status:", error);
//         setLoading(false);
//       });
//   };

//   const closeReceipt = () => {
//     setShowReceipt(false);
//     setApprovedPass(null);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="approval-page hod-theme">
//       {showReceipt && approvedPass && (
//         <GatepassReceipt 
//           pass={approvedPass} 
//           onClose={closeReceipt} 
//           printReceipt={() => window.print()}
//         />
//       )}
      
//       <div className="approval-header">
//         <h1>HOD Gate Pass Approval</h1>
//         <p>Final review of tutor-approved gate passes</p>
//       </div>

//       <div className="approval-container">
//         <div className="stats-container">
//           <div className="stat-card">
//             <h3>Pending</h3>
//             <div className="stat-value">{gatePasses.length}</div>
//           </div>
//           <div className="stat-card">
//             <h3>Today's Passes</h3>
//             <div className="stat-value">{todayApprovedCount}</div>
//           </div>
//           <div className="stat-card">
//             <h3>Approved</h3>
//             <div className="stat-value">{approvedCount}</div>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header">
//             <h2>Awaiting Final Approval</h2>
//             <button className="refresh-btn" onClick={fetchHodGatePasses}>
//               Refresh
//             </button>
//           </div>

//           {loading ? (
//             <div className="loading">Loading gate pass requests...</div>
//           ) : (
//             <div className="table-responsive">
//               <table className="approval-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Department</th>
//                     <th>Year</th>
//                     <th>Purpose</th>
//                     <th>Date</th>
//                     <th>Departure</th>
//                     <th>Return</th>
//                     <th>Tutor</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {gatePasses.length > 0 ? (
//                     gatePasses.map((pass) => (
//                       <tr key={pass._id}>
//                         <td className="name-cell">{pass.name}</td>
//                         <td>{pass.dpmt}</td>
//                         <td>{pass.year}</td>
//                         <td className="purpose-cell">{pass.purpose}</td>
//                         <td>{formatDate(pass.date)}</td>
//                         <td>{`${pass.time}`}</td>
//                         <td>
//                           {pass.returnTime
//                             ? `${pass.returnTime} ${pass.returnampm || ""}`
//                             : "Not specified"}
//                         </td>
//                         <td>{pass.tutor}</td>
//                         <td className="action-buttons">
//                           <button
//                             className="approve-btn"
//                             onClick={() =>
//                               handleHodApproval(pass._id, "Approved")
//                             }
//                             disabled={loading}
//                           >
//                             ✅ Approve
//                           </button>
//                           <button
//                             className="disapprove-btn"
//                             onClick={() =>
//                               handleHodApproval(pass._id, "Disapproved")
//                             }
//                             disabled={loading}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="16"
//                               height="16"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <line x1="18" y1="6" x2="6" y2="18"></line>
//                               <line x1="6" y1="6" x2="18" y2="18"></line>
//                             </svg>
//                             Reject
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="9" className="no-data">
//                         No pending gate passes for HOD approval
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         <div className="approval-footer">
//           <div className="footer-content">
//             <span>Gate Pass Management System — HOD Approval Portal</span>
//             <button className="logout-btn" onClick={handleLogout}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//                 <polyline points="16 17 21 12 16 7"></polyline>
//                 <line x1="21" y1="12" x2="9" y2="12"></line>
//               </svg>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HodApproval;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/hodapproval.css";
// import GatepassReceipt from "./GatepassReceipt";

// const HodApproval = () => {
//   const [gatePasses, setGatePasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [approvedCount, setApprovedCount] = useState(0);
//   const [todayApprovedCount, setTodayApprovedCount] = useState(0);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [approvedPass, setApprovedPass] = useState(null);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     alert("Logging out...");
//     localStorage.clear();
//     navigate("/");
//   };

//   const isToday = (someDate) => {
//     const today = new Date();
//     const date = new Date(someDate);
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   const fetchHodGatePasses = () => {
//     setLoading(true);
//     axios
//       .get("http://localhost:3001/get-hod-gatepasses")
//       .then((response) => {
//         setGatePasses(response.data);
//         setLoading(false);
//         // Resetting counts to 0 since we are handling them manually on approval
//         setApprovedCount(0);
//         setTodayApprovedCount(0);
//       })
//       .catch((error) => {
//         console.error("Error fetching HOD gate pass details:", error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchHodGatePasses();
//   }, []);

//   const handleHodApproval = (id, status) => {
//     setLoading(true);

//     // Find the gate pass before removing it from the list
//     const passToApprove = gatePasses.find((pass) => pass._id === id);

//     axios
//       .post("http://localhost:3001/hod-approval", { id, status })
//       .then((response) => {
//         if (status === "Approved") {
//           setApprovedCount((prev) => prev + 1);

//           // Use current time for checking if today
//           const now = new Date();
//           if (isToday(now)) {
//             setTodayApprovedCount((prev) => prev + 1);
//           }

//           // Set the approved pass with receipt information and email status
//           setApprovedPass({
//             ...passToApprove,
//             approvalDate: new Date().toISOString(),
//             approvalId: response.data.approvalId,
//             status: "Approved",
//             emailSent: response.data.emailSent || false,
//           });

//           // Show receipt
//           setShowReceipt(true);

//           // If email wasn't sent (for any reason), show a notice
//           if (!response.data.emailSent) {
//             alert(
//               "Note: Email notification to student may have failed. Student can still access their receipt online."
//             );
//           } else {
//             console.log("Receipt email sent to student successfully");
//           }
//         } else {
//           alert("Gate pass disapproved. Record deleted and student notified.");
//         }

//         // Remove approved or rejected pass from local list
//         setGatePasses((prevPasses) =>
//           prevPasses.filter((pass) => pass._id !== id)
//         );
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error updating HOD approval status:", error);
//         setLoading(false);
//         alert("Error processing gate pass. Please try again.");
//       });
//   };

//   const closeReceipt = () => {
//     setShowReceipt(false);
//     setApprovedPass(null);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const downloadReceipt = () => {
//     if (!approvedPass || !approvedPass.approvalId) return;

//     // Request a PDF version of the receipt
//     axios({
//       url: `http://localhost:3001/download-receipt/${approvedPass.approvalId}`,
//       method: "GET",
//       responseType: "blob",
//     })
//       .then((response) => {
//         // Create a blob link to download
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute(
//           "download",
//           `GatePass-${approvedPass.approvalId}.pdf`
//         );
//         document.body.appendChild(link);
//         link.click();
//         link.remove();
//       })
//       .catch((error) => {
//         console.error("Error downloading receipt:", error);
//         alert("Failed to download receipt. Please try again.");
//       });
//   };

//   return (
//     <div className="approval-page hod-theme">
//       {showReceipt && approvedPass && (
//         <GatepassReceipt
//           pass={approvedPass}
//           onClose={closeReceipt}
//           downloadReceipt={downloadReceipt}
//         />
//       )}

//       <div className="approval-header">
//         <h1>HOD Gate Pass Approval</h1>
//         <p>Final review of tutor-approved gate passes</p>
//       </div>

//       <div className="approval-container">
//         <div className="stats-container">
//           <div className="stat-card">
//             <h3>Pending</h3>
//             <div className="stat-value">{gatePasses.length}</div>
//           </div>
//           <div className="stat-card">
//             <h3>Today's Passes</h3>
//             <div className="stat-value">{todayApprovedCount}</div>
//           </div>
//           <div className="stat-card">
//             <h3>Approved</h3>
//             <div className="stat-value">{approvedCount}</div>
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header">
//             <h2>Awaiting Final Approval</h2>
//             <button className="refresh-btn" onClick={fetchHodGatePasses}>
//               Refresh
//             </button>
//           </div>

//           {loading ? (
//             <div className="loading">Loading gate pass requests...</div>
//           ) : (
//             <div className="table-responsive">
//               <table className="approval-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Department</th>
//                     <th>Year</th>
//                     <th>Purpose</th>
//                     <th>Date</th>
//                     <th>Departure</th>
//                     <th>Return</th>
//                     <th>Tutor</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {gatePasses.length > 0 ? (
//                     gatePasses.map((pass) => (
//                       <tr key={pass._id}>
//                         <td className="name-cell">{pass.name}</td>
//                         <td>{pass.dpmt}</td>
//                         <td>{pass.year}</td>
//                         <td className="purpose-cell">{pass.purpose}</td>
//                         <td>{formatDate(pass.date)}</td>
//                         <td>{`${pass.time} `}</td>
//                         <td>
//                           {pass.returnTime
//                             ? `${pass.returnTime} ${pass.returnampm || ""}`
//                             : "Not specified"}
//                         </td>
//                         <td>{pass.tutor}</td>
//                         <td className="action-buttons">
//                           <button
//                             className="approve-btn"
//                             onClick={() =>
//                               handleHodApproval(pass._id, "Approved")
//                             }
//                             disabled={loading}
//                           >
//                             ✅ Approve
//                           </button>
//                           <button
//                             className="disapprove-btn"
//                             onClick={() =>
//                               handleHodApproval(pass._id, "Disapproved")
//                             }
//                             disabled={loading}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="16"
//                               height="16"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <line x1="18" y1="6" x2="6" y2="18"></line>
//                               <line x1="6" y1="6" x2="18" y2="18"></line>
//                             </svg>
//                             Reject
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="9" className="no-data">
//                         No pending gate passes for HOD approval
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         <div className="approval-footer">
//           <div className="footer-content">
//             <span>Gate Pass Management System — HOD Approval Portal</span>
//             <button className="logout-btn" onClick={handleLogout}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//                 <polyline points="16 17 21 12 16 7"></polyline>
//                 <line x1="21" y1="12" x2="9" y2="12"></line>
//               </svg>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HodApproval;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/hodapproval.css";

const HodApproval = () => {
  const [gatePasses, setGatePasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvedCount, setApprovedCount] = useState(0);
  const [todayApprovedCount, setTodayApprovedCount] = useState(0);
  const [recentlyApproved, setRecentlyApproved] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logging out...");
    localStorage.clear();
    navigate("/");
  };

  const isToday = (someDate) => {
    const today = new Date();
    const date = new Date(someDate);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const fetchHodGatePasses = () => {
    setLoading(true);
    axios
      .get("http://localhost:3001/get-hod-gatepasses")
      .then((response) => {
        setGatePasses(response.data);
        setLoading(false);
        // Resetting counts to 0 since we are handling them manually on approval
        setApprovedCount(0);
        setTodayApprovedCount(0);
      })
      .catch((error) => {
        console.error("Error fetching HOD gate pass details:", error);
        setLoading(false);
      });
  };

  // Fetch recently approved passes
  const fetchRecentlyApproved = () => {
    axios
      .get("http://localhost:3001/get-recently-approved")
      .then((response) => {
        setRecentlyApproved(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recently approved passes:", error);
      });
  };

  useEffect(() => {
    fetchHodGatePasses();
    fetchRecentlyApproved();
  }, []);

  const handleHodApproval = (id, status) => {
    setLoading(true);

    // Find the gate pass before removing it from the list
    const passToApprove = gatePasses.find((pass) => pass._id === id);

    axios
      .post("http://localhost:3001/hod-approval", {
        id,
        status,
        sendEmail: true, // Always send email
        includeReceipt: status === "Approved", // Include receipt in email for approvals
      })
      .then((response) => {
        if (status === "Approved") {
          setApprovedCount((prev) => prev + 1);

          // Use current time for checking if today
          const now = new Date();
          if (isToday(now)) {
            setTodayApprovedCount((prev) => prev + 1);
          }

          // Add to recently approved list with the approval ID
          const approvedPass = {
            ...passToApprove,
            approvalDate: new Date().toISOString(),
            approvalId: response.data.approvalId,
            status: "Approved",
          };

          setRecentlyApproved((prev) => [approvedPass, ...prev].slice(0, 10));

          // If email wasn't sent (for any reason), show a notice
          if (!response.data.emailSent) {
            alert(
              "Gate pass approved, but email notification to student may have failed. The receipt was generated and stored in the system."
            );
          } else {
            alert(
              "Gate pass approved! Receipt has been emailed to the student."
            );
          }
        } else {
          if (response.data.emailSent) {
            alert(
              "Gate pass disapproved. Student has been notified via email."
            );
          } else {
            alert(
              "Gate pass disapproved. Record deleted but email notification failed."
            );
          }
        }

        // Remove approved or rejected pass from local list
        setGatePasses((prevPasses) =>
          prevPasses.filter((pass) => pass._id !== id)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating HOD approval status:", error);
        setLoading(false);
        alert("Error processing gate pass. Please try again.");
      });
  };

  const viewReceipt = (approvalId) => {
    // Navigate to a dedicated receipt page
    navigate(`/receipt/${approvalId}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="approval-page hod-theme">
      <div className="approval-header">
        <h1>HOD Gate Pass Approval</h1>
        <p>Final review of tutor-approved gate passes</p>
      </div>

      <div className="approval-container">
        <div className="stats-container">
          <div className="stat-card">
            <h3>Pending</h3>
            <div className="stat-value">{gatePasses.length}</div>
          </div>
          <div className="stat-card">
            <h3>Today's Passes</h3>
            <div className="stat-value">{todayApprovedCount}</div>
          </div>
          <div className="stat-card">
            <h3>Approved</h3>
            <div className="stat-value">{approvedCount}</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Awaiting Final Approval</h2>
            <button className="refresh-btn" onClick={fetchHodGatePasses}>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="loading">Loading gate pass requests...</div>
          ) : (
            <div className="table-responsive">
              <table className="approval-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Purpose</th>
                    <th>Date</th>
                    <th>Departure</th>
                    <th>Return</th>
                    <th>Tutor</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {gatePasses.length > 0 ? (
                    gatePasses.map((pass) => (
                      <tr key={pass._id}>
                        <td className="name-cell">{pass.name}</td>
                        <td>{pass.dpmt}</td>
                        <td>{pass.year}</td>
                        <td className="purpose-cell">{pass.purpose}</td>
                        <td>{formatDate(pass.date)}</td>
                        <td>{`${pass.time} ${pass.ampm || ""}`}</td>
                        <td>
                          {pass.returnTime
                            ? `${pass.returnTime} ${pass.returnampm || ""}`
                            : "Not specified"}
                        </td>
                        <td>{pass.tutor}</td>
                        <td className="action-buttons">
                          <button
                            className="approve-btn"
                            onClick={() =>
                              handleHodApproval(pass._id, "Approved")
                            }
                            disabled={loading}
                          >
                            ✅ Approve
                          </button>
                          <button
                            className="disapprove-btn"
                            onClick={() =>
                              handleHodApproval(pass._id, "Disapproved")
                            }
                            disabled={loading}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="no-data">
                        No pending gate passes for HOD approval
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recently Approved Passes Section */}
        <div className="card">
          <div className="card-header">
            <h2>Recently Approved Passes</h2>
            <button className="refresh-btn" onClick={fetchRecentlyApproved}>
              Refresh
            </button>
          </div>

          <div className="table-responsive">
            <table className="approval-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Date</th>
                  <th>Approval Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentlyApproved.length > 0 ? (
                  recentlyApproved.map((pass) => (
                    <tr key={pass._id || pass.approvalId}>
                      <td className="name-cell">{pass.name}</td>
                      <td>{pass.dpmt}</td>
                      <td>{pass.year}</td>
                      <td>{formatDate(pass.date)}</td>
                      <td>{formatDate(pass.approvalDate)}</td>
                      <td className="action-buttons">
                        <button
                          className="view-receipt-btn"
                          onClick={() => viewReceipt(pass.approvalId)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No recently approved gate passes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="approval-footer">
          <div className="footer-content">
            <span>Gate Pass Management System — HOD Approval Portal</span>
            <button className="logout-btn" onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodApproval;