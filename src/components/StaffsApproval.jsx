

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/staffapproval.css"; // Make sure to update the path to your CSS file
// import Footer from "./Footer";

// const StaffsApproval = () => {
//   const [gatePasses, setGatePasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");

//   // Function to fetch gate pass details
//   const fetchGatePasses = () => {
//     setLoading(true);
//     axios
//       .get("http://localhost:3001/get-gatepasses")
//       .then((response) => {
//         setGatePasses(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching gate pass details:", error);
//         setLoading(false);
//       });
//   };

//   // Fetch gate pass details on component mount
//   useEffect(() => {
//     fetchGatePasses();
//   }, []);

//   // Function to handle approval or disapproval
//   const handleApproval = (id, status, regno) => {
//     setLoading(true);
//     axios
//       .post("http://localhost:3001/update-gatepass", { id, status, regno })
//       .then(() => {
//         // Refresh the list after action
//         fetchGatePasses();

//         if (status === "Approved") {
//           alert("Gate pass approved and forwarded to HOD for final approval");
//         } else {
//           alert(
//             "Gate pass disapproved. Record deleted and notification sent to student."
//           );
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating gate pass status:", error);
//         setLoading(false);
//       });
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     // Add your logout logic here
//     alert("Logging out...");
//     // Example: redirect to login page
//      window.location.href = "/";
//   };

//   // Filter gate passes
//   const filteredPasses =
//     filter === "all"
//       ? gatePasses
//       : gatePasses.filter((pass) => pass.dpmt === filter);

//   return (
//     <div className="staffs-approvalbg-container">
//       <div className="approval-container">
//         {/* Header */}
//         <div className="approval-header">
//           <div>
//             <h1 className="header-title">
//               Gate Pass Requests to Staffs Approval
//             </h1>
//             <p className="header-subtitle">
//               {gatePasses.length} pending requests
//             </p>
//           </div>
//           <button className="refresh-btn" onClick={fetchGatePasses}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
//             </svg>
//             Refresh
//           </button>
//         </div>

//         {/* Filter Bar */}
//         <div className="filter-bar">
//           <span className="filter-label">Filter by Department:</span>
//           <button
//             onClick={() => setFilter("all")}
//             className={`filter-btn ${filter === "all" ? "active" : ""}`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilter("CSE")}
//             className={`filter-btn ${filter === "CSE" ? "active" : ""}`}
//           >
//             CSE
//           </button>
//           <button
//             onClick={() => setFilter("ECE")}
//             className={`filter-btn ${filter === "ECE" ? "active" : ""}`}
//           >
//             ECE
//           </button>
//           <button
//             onClick={() => setFilter("EEE")}
//             className={`filter-btn ${filter === "EEE" ? "active" : ""}`}
//           >
//             EEE
//           </button>
//           <button
//             onClick={() => setFilter("MECH")}
//             className={`filter-btn ${filter === "MECH" ? "active" : ""}`}
//           >
//             MECH
//           </button>
//         </div>

//         {/* Loading or Data */}
//         {loading ? (
//           <div className="loading-container">
//             <div className="spinner"></div>
//           </div>
//         ) : (
//           <>
//             {filteredPasses.length > 0 ? (
//               <table className="requests-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>
//                       <span className="column-icon">
//                         <svg
//                           className="icon"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
//                           <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
//                         </svg>
//                         Department
//                       </span>
//                     </th>
//                     <th>Year</th>
//                     <th>Purpose</th>
//                     <th>
//                       <span className="column-icon">
//                         <svg
//                           className="icon"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <rect
//                             x="3"
//                             y="4"
//                             width="18"
//                             height="18"
//                             rx="2"
//                             ry="2"
//                           ></rect>
//                           <line x1="16" y1="2" x2="16" y2="6"></line>
//                           <line x1="8" y1="2" x2="8" y2="6"></line>
//                           <line x1="3" y1="10" x2="21" y2="10"></line>
//                         </svg>
//                         Date
//                       </span>
//                     </th>
//                     <th>
//                       <span className="column-icon">
//                         <svg
//                           className="icon"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"></path>
//                         </svg>
//                         Departure
//                       </span>
//                     </th>
//                     <th>
//                       <span className="column-icon">
//                         <svg
//                           className="icon"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
//                         </svg>
//                         Return
//                       </span>
//                     </th>
//                     <th>
//                       <span className="column-icon">
//                         <svg
//                           className="icon"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                           <circle cx="12" cy="7" r="4"></circle>
//                         </svg>
//                         Tutor
//                       </span>
//                     </th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredPasses.map((pass) => (
//                     <tr key={pass._id}>
//                       <td>{pass.name}</td>
//                       <td>
//                         <span className="badge">{pass.dpmt}</span>
//                       </td>
//                       <td>{pass.year}</td>
//                       <td>
//                         <div className="purpose-text" title={pass.purpose}>
//                           {pass.purpose}
//                         </div>
//                       </td>
//                       <td>{pass.date}</td>
//                       <td>
//                         <div className="time-display">
//                           <svg
//                             className="icon"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#94a3b8"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <circle cx="12" cy="12" r="10"></circle>
//                             <polyline points="12 6 12 12 16 14"></polyline>
//                           </svg>
//                           {`${pass.time}`}
//                         </div>
//                       </td>
//                       <td>
//                         {pass.returnTime ? (
//                           <div className="time-display">
//                             <svg
//                               className="icon"
//                               xmlns="http://www.w3.org/2000/svg"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="#94a3b8"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <circle cx="12" cy="12" r="10"></circle>
//                               <polyline points="12 6 12 12 16 14"></polyline>
//                             </svg>
//                             {`${pass.returnTime} ${pass.returnampm || ""}`}
//                           </div>
//                         ) : (
//                           <span className="time-not-specified">
//                             Not specified
//                           </span>
//                         )}
//                       </td>
//                       <td>{pass.tutor}</td>
//                       <td className="action-buttons">
//                         <button
//                           className="approve-btn"
//                           onClick={() =>
//                             handleApproval(pass._id, "Approved", pass.regno)
//                           }
//                         >
//                           ✅Approve
//                         </button>
//                         <button
//                           className="disapprove-btn"
//                           onClick={() =>
//                             handleApproval(pass._id, "Disapproved", pass.regno)
//                           }
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <line x1="18" y1="6" x2="6" y2="18"></line>
//                             <line x1="6" y1="6" x2="18" y2="18"></line>
//                           </svg>
//                           Reject
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="empty-state">
//                 <svg
//                   className="empty-icon"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                   <polyline points="14 2 14 8 20 8"></polyline>
//                   <line x1="16" y1="13" x2="8" y2="13"></line>
//                   <line x1="16" y1="17" x2="8" y2="17"></line>
//                   <polyline points="10 9 9 9 8 9"></polyline>
//                 </svg>
//                 <h3 className="empty-title">No gate pass requests found</h3>
//                 <p className="empty-description">
//                   All requests have been processed or no new requests
//                 </p>
//               </div>
//             )}
//           </>
//         )}

//         {/* Footer */}
//         <div className="approval-footer">
//           <div className="footer-content">
//             <span>Gate Pass Management System — Staff Approval Portal</span>
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
//       {/* <Footer/> */}
//     </div>
//   );
// };

// export default StaffsApproval;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/staffapproval.css"; // Make sure to update the path to your CSS file
// import Footer from "./Footer";

// const StaffsApproval = () => {
//   const [gatePasses, setGatePasses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");

//   // Function to fetch gate pass details
//   const fetchGatePasses = () => {
//     setLoading(true);
//     axios
//       .get("http://localhost:3001/get-gatepasses")
//       .then((response) => {
//         setGatePasses(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching gate pass details:", error);
//         setLoading(false);
//       });
//   };

//   // Fetch gate pass details on component mount
//   useEffect(() => {
//     fetchGatePasses();
//   }, []);

//   // Function to handle approval or disapproval
//   const handleApproval = (id, status, regno) => {
//     setLoading(true);
//     axios
//       .post("http://localhost:3001/update-gatepass", { id, status, regno })
//       .then(() => {
//         // Refresh the list after action
//         fetchGatePasses();

//         if (status === "Approved") {
//           alert("Gate pass approved and forwarded to HOD for final approval");
//         } else {
//           alert(
//             "Gate pass disapproved. Record deleted and notification sent to student."
//           );
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating gate pass status:", error);
//         setLoading(false);
//       });
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     // Add your logout logic here
//     alert("Logging out...");
//     // Example: redirect to login page
//     window.location.href = "/";
//   };

//   // Filter gate passes - Fixed to handle case insensitivity
//   const filteredPasses = React.useMemo(() => {
//     if (filter === "all") {
//       return gatePasses;
//     } else {
//       // Use case-insensitive comparison
//       return gatePasses.filter(
//         (pass) => pass.dpmt && pass.dpmt.toUpperCase() === filter.toUpperCase()
//       );
//     }
//   }, [gatePasses, filter]);

//   return (
//     <div className="staffs-approvalbg-container">
//       <div className="approval-container">
//         {/* Header */}
//         <div className="approval-header">
//           <div>
//             <h1 className="header-title">
//               Gate Pass Requests to Staffs Approval
//             </h1>
//             <p className="header-subtitle">
//               {gatePasses.length} pending requests
//             </p>
//           </div>
//           <button className="refresh-btn" onClick={fetchGatePasses}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
//             </svg>
//             Refresh
//           </button>
//         </div>

//         {/* Filter Bar */}
//         <div className="filter-bar">
//           <span className="filter-label">Filter by Department:</span>
//           <button
//             onClick={() => setFilter("all")}
//             className={`filter-btn ${filter === "all" ? "active" : ""}`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilter("CSE")}
//             className={`filter-btn ${filter === "CSE" ? "active" : ""}`}
//           >
//             CSE
//           </button>
//           <button
//             onClick={() => setFilter("ECE")}
//             className={`filter-btn ${filter === "ECE" ? "active" : ""}`}
//           >
//             ECE
//           </button>
//           <button
//             onClick={() => setFilter("EEE")}
//             className={`filter-btn ${filter === "EEE" ? "active" : ""}`}
//           >
//             EEE
//           </button>
//           <button
//             onClick={() => setFilter("MECH")}
//             className={`filter-btn ${filter === "MECH" ? "active" : ""}`}
//           >
//             MECH
//           </button>
//         </div>

//         {/* Debug information - can be removed after testing */}
//         <div style={{ padding: "10px", fontSize: "12px", color: "#666" }}>
//           Active filter: {filter} | Total records: {gatePasses.length} | Filtered records: {filteredPasses.length}
//         </div>

//         {/* Loading or Data */}
//         {loading ? (
//           <div className="loading-container">
//             <div className="spinner"></div>
//           </div>
//         ) : (
//           <>
//             {filteredPasses.length > 0 ? (
//               <table className="requests-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>
//                       <span className="column-icon">
//                         <svg
//                           className="icon"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
//                           <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
//                         </svg>
//                         Department
//                       </span>
//                     </th>
//                     <th>Year</th>
//                     <th>Purpose</th>
//                     <th>
//                       <span className="column-icon">
//                         <svg
//                           className="icon"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <rect
//                             x="3"
//                             y="4"
//                             width="18"
//                             height="18"
//                             rx="2"
//                             ry="2"
//                           ></rect>
//                           <line x1="16" y1="2" x2="16" y2="6"></line>
//                           <line x1="8" y1="2" x2="8" y2="6"></line>
//                           <line x1="3" y1="10" x2="21" y2="10"></line>
//                         </svg>
//                         Date
//                       </span>
//                     </th>
//                     <th>
//                       <span className="column-icon">
//                         <svg
//                           className="icon"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"></path>
//                         </svg>
//                         Departure
//                       </span>
//                     </th>
//                     <th>
//                       <span className="column-icon">
//                         <svg
//                           className="icon"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
//                         </svg>
//                         Return
//                       </span>
//                     </th>
//                     <th>
//                       <span className="column-icon">
//                         <svg
//                           className="icon"
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                           <circle cx="12" cy="7" r="4"></circle>
//                         </svg>
//                         Tutor
//                       </span>
//                     </th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredPasses.map((pass) => (
//                     <tr key={pass._id}>
//                       <td>{pass.name}</td>
//                       <td>
//                         <span className="badge">{pass.dpmt}</span>
//                       </td>
//                       <td>{pass.year}</td>
//                       <td>
//                         <div className="purpose-text" title={pass.purpose}>
//                           {pass.purpose}
//                         </div>
//                       </td>
//                       <td>{pass.date}</td>
//                       <td>
//                         <div className="time-display">
//                           <svg
//                             className="icon"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="#94a3b8"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <circle cx="12" cy="12" r="10"></circle>
//                             <polyline points="12 6 12 12 16 14"></polyline>
//                           </svg>
//                           {`${pass.time}`}
//                         </div>
//                       </td>
//                       <td>
//                         {pass.returnTime ? (
//                           <div className="time-display">
//                             <svg
//                               className="icon"
//                               xmlns="http://www.w3.org/2000/svg"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="#94a3b8"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <circle cx="12" cy="12" r="10"></circle>
//                               <polyline points="12 6 12 12 16 14"></polyline>
//                             </svg>
//                             {`${pass.returnTime} ${pass.returnampm || ""}`}
//                           </div>
//                         ) : (
//                           <span className="time-not-specified">
//                             Not specified
//                           </span>
//                         )}
//                       </td>
//                       <td>{pass.tutor}</td>
//                       <td className="action-buttons">
//                         <button
//                           className="approve-btn"
//                           onClick={() =>
//                             handleApproval(pass._id, "Approved", pass.regno)
//                           }
//                         >
//                           ✅Approve
//                         </button>
//                         <button
//                           className="disapprove-btn"
//                           onClick={() =>
//                             handleApproval(pass._id, "Disapproved", pass.regno)
//                           }
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <line x1="18" y1="6" x2="6" y2="18"></line>
//                             <line x1="6" y1="6" x2="18" y2="18"></line>
//                           </svg>
//                           Reject
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <div className="empty-state">
//                 <svg
//                   className="empty-icon"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                   <polyline points="14 2 14 8 20 8"></polyline>
//                   <line x1="16" y1="13" x2="8" y2="13"></line>
//                   <line x1="16" y1="17" x2="8" y2="17"></line>
//                   <polyline points="10 9 9 9 8 9"></polyline>
//                 </svg>
//                 <h3 className="empty-title">No gate pass requests found</h3>
//                 <p className="empty-description">
//                   All requests have been processed or no new requests
//                 </p>
//               </div>
//             )}
//           </>
//         )}

//         {/* Footer */}
//         <div className="approval-footer">
//           <div className="footer-content">
//             <span>Gate Pass Management System — Staff Approval Portal</span>
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
//       {/* <Footer/> */}
//     </div>
//   );
// };

// export default StaffsApproval;





import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/staffapproval.css"; // Make sure to update the path to your CSS file
import Footer from "./Footer";

const StaffsApproval = () => {
  const [gatePasses, setGatePasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Function to fetch gate pass details
  const fetchGatePasses = () => {
    setLoading(true);
    axios
      .get("http://localhost:3001/get-gatepasses")
      .then((response) => {
        setGatePasses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gate pass details:", error);
        setLoading(false);
      });
  };

  // Fetch gate pass details on component mount
  useEffect(() => {
    fetchGatePasses();
  }, []);

  // Function to handle approval or disapproval
  const handleApproval = (id, status, regno) => {
    setLoading(true);
    axios
      .post("http://localhost:3001/update-gatepass", { id, status, regno })
      .then(() => {
        // Refresh the list after action
        fetchGatePasses();

        if (status === "Approved") {
          alert("Gate pass approved and forwarded to HOD for final approval");
        } else {
          alert(
            "Gate pass disapproved. Record deleted and notification sent to student."
          );
        }
      })
      .catch((error) => {
        console.error("Error updating gate pass status:", error);
        setLoading(false);
      });
  };

  // Function to handle logout
  const handleLogout = () => {
    // Add your logout logic here
    alert("Logging out...");
    // Example: redirect to login page
    window.location.href = "/";
  };

  // Filter gate passes - Fixed to handle case insensitivity
  const filteredPasses = React.useMemo(() => {
    if (filter === "all") {
      return gatePasses;
    } else {
      // Use case-insensitive comparison
      return gatePasses.filter(
        (pass) => pass.dpmt && pass.dpmt.toUpperCase() === filter.toUpperCase()
      );
    }
  }, [gatePasses, filter]);

  return (
    <div className="staffs-approvalbg-container">
      <div className="approval-container">
        {/* Header */}
        <div className="approval-header">
          <div>
            <h1 className="header-title">
              Gate Pass Requests to Staffs Approval
            </h1>
            <p className="header-subtitle">
              {gatePasses.length} pending requests
            </p>
          </div>
          <button className="refresh-btn" onClick={fetchGatePasses}>
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
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Filter Bar with Added Departments */}
        <div className="filter-bar">
          <span className="filter-label">Filter by Department:</span>
          <button
            onClick={() => setFilter("all")}
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("CSE")}
            className={`filter-btn ${filter === "CSE" ? "active" : ""}`}
          >
            CSE
          </button>
          <button
            onClick={() => setFilter("ECE")}
            className={`filter-btn ${filter === "ECE" ? "active" : ""}`}
          >
            ECE
          </button>
          <button
            onClick={() => setFilter("EEE")}
            className={`filter-btn ${filter === "EEE" ? "active" : ""}`}
          >
            EEE
          </button>
          <button
            onClick={() => setFilter("MECH")}
            className={`filter-btn ${filter === "MECH" ? "active" : ""}`}
          >
            MECH
          </button>
          <button
            onClick={() => setFilter("CIVIL")}
            className={`filter-btn ${filter === "CIVIL" ? "active" : ""}`}
          >
            CIVIL
          </button>
          <button
            onClick={() => setFilter("AIDS")}
            className={`filter-btn ${filter === "AIDS" ? "active" : ""}`}
          >
            AIDS
          </button>
        </div>

        {/* Debug information - can be removed after testing */}
        <div style={{ padding: "10px", fontSize: "12px", color: "#666" }}>
          Active filter: {filter} | Total records: {gatePasses.length} |
          Filtered records: {filteredPasses.length}
        </div>

        {/* Loading or Data */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {filteredPasses.length > 0 ? (
              <table className="requests-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>
                      <span className="column-icon">
                        <svg
                          className="icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        Department
                      </span>
                    </th>
                    <th>Year</th>
                    <th>Purpose</th>
                    <th>
                      <span className="column-icon">
                        <svg
                          className="icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Date
                      </span>
                    </th>
                    <th>
                      <span className="column-icon">
                        <svg
                          className="icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"></path>
                        </svg>
                        Departure
                      </span>
                    </th>
                    <th>
                      <span className="column-icon">
                        <svg
                          className="icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path>
                        </svg>
                        Return
                      </span>
                    </th>
                    <th>
                      <span className="column-icon">
                        <svg
                          className="icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Tutor
                      </span>
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPasses.map((pass) => (
                    <tr key={pass._id}>
                      <td>{pass.name}</td>
                      <td>
                        <span className="badge">{pass.dpmt}</span>
                      </td>
                      <td>{pass.year}</td>
                      <td>
                        <div className="purpose-text" title={pass.purpose}>
                          {pass.purpose}
                        </div>
                      </td>
                      <td>{pass.date}</td>
                      <td>
                        <div className="time-display">
                          <svg
                            className="icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {`${pass.time}`}
                        </div>
                      </td>
                      <td>
                        {pass.returnTime ? (
                          <div className="time-display">
                            <svg
                              className="icon"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#94a3b8"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            {`${pass.returnTime} ${pass.returnampm || ""}`}
                          </div>
                        ) : (
                          <span className="time-not-specified">
                            Not specified
                          </span>
                        )}
                      </td>
                      <td>{pass.tutor}</td>
                      <td className="action-buttons">
                        <button
                          className="approve-btn"
                          onClick={() =>
                            handleApproval(pass._id, "Approved", pass.regno)
                          }
                        >
                          ✅Approve
                        </button>
                        <button
                          className="disapprove-btn"
                          onClick={() =>
                            handleApproval(pass._id, "Disapproved", pass.regno)
                          }
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
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <svg
                  className="empty-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <h3 className="empty-title">No gate pass requests found</h3>
                <p className="empty-description">
                  All requests have been processed or no new requests
                </p>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="approval-footer">
          <div className="footer-content">
            <span>Gate Pass Management System — Staff Approval Portal</span>
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
      <Footer/>
    </div>
  );
};

export default StaffsApproval;