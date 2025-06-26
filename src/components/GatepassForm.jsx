import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Gatepass.css";

const GatepassForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dpmt: "",
    year: "",
    purpose: "",
    date: "",
    time: "",
    ampm: "AM",
    returnTime: "",
    returnAmpm: "AM",
    tutor: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to convert 24-hour input to 12-hour format
  const formatTimeTo12Hour = (time24) => {
    if (!time24) return "";

    const [hours, minutes] = time24.split(":");
    let hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour ? hour : 12; // Convert '0' to '12'

    return `${hour.toString().padStart(2, "0")}:${minutes}`;
  };
  const navigate = useNavigate();
  
    // Logout function
    const handleLogout = () => {
      alert("Logging out...");
      localStorage.clear(); // clear token or session info
      navigate("/"); // redirect to login page
    };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedData = {
      ...formData,
      time: `${formData.time} ${formData.ampm}`,
      returnTime: `${formData.returnTime} ${formData.returnAmpm}`,
    };

    // Client-side validation
    if (
      !formData.name.trim() ||
      !formData.dpmt.trim() ||
      !formData.year.trim() ||
      !formData.purpose.trim() ||
      !formData.date.trim() ||
      !formData.time.trim() ||
      !formData.returnTime.trim() ||
      !formData.tutor.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Log the data for debugging
    console.log("Submitting Data:", JSON.stringify(formattedData, null, 2));

    try {
      // Send request to the backend
      const response = await fetch("http://localhost:3001/submit-gatepass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      // Check if the response is okay
      if (response.ok) {
        const result = await response.json();
        console.log("Response:", result);

        // Show a success alert
        alert(result.message || "Gate pass submitted and email sent!");

        // Reset form data after successful submission
        setFormData({
          name: "",
          dpmt: "",
          year: "",
          purpose: "",
          date: "",
          time: "",
          ampm: "AM",
          returnTime: "",
          returnAmpm: "AM",
          tutor: "",
        });
      } else {
        const result = await response.json();
        alert(result.error || "Error submitting gate pass.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while submitting. Check console for details.");
    }
  };

  return (
    <div className="gatebg-container">
      {/* <video autoPlay loop muted className="bg-video">
      <source src="your-video-url.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> */}
      <div className="gateform-container">
        <h2>Gate Pass System</h2>
        <form onSubmit={handleSubmit} className="gatepass-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dpmt">Department:</label>
            <select
              id="dpmt"
              name="dpmt"
              value={formData.dpmt}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
              <option value="eee">EEE</option>
              <option value="aids">AIDS</option>
              <option value="civil">CIVIL</option>
              <option value="it">IT</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="first">I</option>
              <option value="second">II</option>
              <option value="third">III</option>
              <option value="fourth">IV</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="purpose">Purpose:</label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              placeholder="Enter Purpose"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group time-group">
            <label htmlFor="time">Departure Time:</label>
            <div className="time-input-container">
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={(e) => {
                  const time24 = e.target.value;
                  if (time24) {
                    const hours = parseInt(time24.split(":")[0], 10);
                    const newAmPm = hours >= 12 ? "PM" : "AM";
                    setFormData({
                      ...formData,
                      time: formatTimeTo12Hour(time24),
                      ampm: newAmPm,
                    });
                  } else {
                    handleChange(e);
                  }
                }}
                required
                className="time-input"
              />
              <select
                name="ampm"
                value={formData.ampm}
                onChange={handleChange}
                className="ampm-select"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div className="form-group time-group">
            <label htmlFor="returnTime">Return Time:</label>
            <div className="time-input-container">
              <input
                type="time"
                id="returnTime"
                name="returnTime"
                value={formData.returnTime}
                onChange={(e) => {
                  const time24 = e.target.value;
                  if (time24) {
                    const hours = parseInt(time24.split(":")[0], 10);
                    const newAmPm = hours >= 12 ? "PM" : "AM";
                    setFormData({
                      ...formData,
                      returnTime: formatTimeTo12Hour(time24),
                      returnAmpm: newAmPm,
                    });
                  } else {
                    handleChange(e);
                  }
                }}
                required
                className="time-input"
              />
              <select
                name="returnAmpm"
                value={formData.returnAmpm}
                onChange={handleChange}
                className="ampm-select"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tutor">Tutor:</label>
            <select
              id="tutor"
              name="tutor"
              value={formData.tutor}
              onChange={handleChange}
              required
            >
              <option value="">Select Tutor</option>
              <option value="Amsaveni">Amsaveni</option>
              <option value="Karthikeyan">Karthikeyan</option>
              <option value="PiriyaDharsini">PiriyaDharsini</option>
              <option value="VijayKumar">VijayKumar</option>
              <option value="RajKumar">RajKumar</option>
              <option value="Dheenathayalan">Dheenathayalan</option>
              <option value="Amutha">Amutha</option>
            </select>
          </div>

          <div className="button-container">
            <button type="submit">Submit</button>
            <button type="submit" onClick={handleLogout}>
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
        </form>
      </div>
    </div>
  );
};

export default GatepassForm;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Gatepass.css";

// const GatepassForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     dpmt: "",
//     year: "",
//     purpose: "",
//     date: "",
//     time: "",
//     ampm: "AM",
//     returnTime: "",
//     returnAmpm: "AM",
//     tutor: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const formatTimeTo12Hour = (time24) => {
//     if (!time24) return "";
//     const [hours, minutes] = time24.split(":");
//     let hour = parseInt(hours, 10);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     hour = hour % 12;
//     hour = hour ? hour : 12;
//     return `${hour.toString().padStart(2, "0")}:${minutes}`;
//   };

//   const handleLogout = () => {
//     alert("Logging out...");
//     localStorage.clear();
//     navigate("/");
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formattedData = {
//       ...formData,
//       time: `${formData.time} ${formData.ampm}`,
//       returnTime: `${formData.returnTime} ${formData.returnAmpm}`,
//     };

//     if (
//       !formData.name.trim() ||
//       !formData.dpmt.trim() ||
//       !formData.year.trim() ||
//       !formData.purpose.trim() ||
//       !formData.date.trim() ||
//       !formData.time.trim() ||
//       !formData.returnTime.trim() ||
//       !formData.tutor.trim()
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     console.log("Submitting Data:", JSON.stringify(formattedData, null, 2));

//     try {
//       const response = await fetch("http://localhost:3001/submit-gatepass", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formattedData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Response:", result);
//         alert(result.message || "Gate pass submitted and email sent!");

//         setFormData({
//           name: "",
//           dpmt: "",
//           year: "",
//           purpose: "",
//           date: "",
//           time: "",
//           ampm: "AM",
//           returnTime: "",
//           returnAmpm: "AM",
//           tutor: "",
//         });
//       } else {
//         const result = await response.json();
//         alert(result.error || "Error submitting gate pass.");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       alert("An error occurred while submitting. Check console for details.");
//     }
//   };

//   return (
//     <div className="gatebg-container">
//       <div className="gateform-container">
//         <h2>Gate Pass System</h2>
//         <form onSubmit={handleSubmit} className="gatepass-form">
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="dpmt">Department:</label>
//             <select
//               id="dpmt"
//               name="dpmt"
//               value={formData.dpmt}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Department</option>
//               <option value="cse">CSE</option>
//               <option value="ece">ECE</option>
//               <option value="eee">EEE</option>
//               <option value="aids">AIDS</option>
//               <option value="civil">CIVIL</option>
//               <option value="it">IT</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="year">Year:</label>
//             <select
//               id="year"
//               name="year"
//               value={formData.year}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Year</option>
//               <option value="first">I</option>
//               <option value="second">II</option>
//               <option value="third">III</option>
//               <option value="fourth">IV</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="purpose">Purpose:</label>
//             <input
//               type="text"
//               id="purpose"
//               name="purpose"
//               placeholder="Enter Purpose"
//               value={formData.purpose}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="date">Date:</label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group time-group">
//             <label htmlFor="time">Departure Time:</label>
//             <div className="time-input-container">
//               <input
//                 type="time"
//                 id="time"
//                 name="time"
//                 onChange={(e) => {
//                   const time24 = e.target.value;
//                   if (time24) {
//                     const hours = parseInt(time24.split(":")[0], 10);
//                     const newAmPm = hours >= 12 ? "PM" : "AM";
//                     setFormData({
//                       ...formData,
//                       time: formatTimeTo12Hour(time24),
//                       ampm: newAmPm,
//                     });
//                   } else {
//                     handleChange(e);
//                   }
//                 }}
//                 required
//                 className="time-input"
//               />
//               <select
//                 name="ampm"
//                 value={formData.ampm}
//                 onChange={handleChange}
//                 className="ampm-select"
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-group time-group">
//             <label htmlFor="returnTime">Return Time:</label>
//             <div className="time-input-container">
//               <input
//                 type="time"
//                 id="returnTime"
//                 name="returnTime"
//                 onChange={(e) => {
//                   const time24 = e.target.value;
//                   if (time24) {
//                     const hours = parseInt(time24.split(":")[0], 10);
//                     const newAmPm = hours >= 12 ? "PM" : "AM";
//                     setFormData({
//                       ...formData,
//                       returnTime: formatTimeTo12Hour(time24),
//                       returnAmpm: newAmPm,
//                     });
//                   } else {
//                     handleChange(e);
//                   }
//                 }}
//                 required
//                 className="time-input"
//               />
//               <select
//                 name="returnAmpm"
//                 value={formData.returnAmpm}
//                 onChange={handleChange}
//                 className="ampm-select"
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="tutor">Tutor:</label>
//             <select
//               id="tutor"
//               name="tutor"
//               value={formData.tutor}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Tutor</option>
//               <option value="Amsaveni">Amsaveni</option>
//               <option value="Karthikeyan">Karthikeyan</option>
//               <option value="PiriyaDharsini">PiriyaDharsini</option>
//               <option value="VijayKumar">VijayKumar</option>
//               <option value="RajKumar">RajKumar</option>
//               <option value="Dheenathayalan">Dheenathayalan</option>
//               <option value="Amutha">Amutha</option>
//             </select>
//           </div>

//           <div className="button-container">
//             <button type="submit">Submit</button>
//             <button type="button" onClick={handleLogout}>
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
//         </form>
//       </div>
//     </div>
//   );
// };

// export default GatepassForm;




