// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/LoginForm.css";

// // const LoginForm = () => {
// //   const [registerNumber, setRegisterNumber] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = (e) => {
// //     e.preventDefault();
// //     const isRegisterNumberValid = /^\d{7}$/.test(registerNumber);
// //     const isPasswordValid = /^[a-zA-Z]+@\d+$/.test(password);
// //     if (isRegisterNumberValid && isPasswordValid) {
// //       alert("Login successful!");
// //       navigate("/dashboard");
// //     } else {
// //       alert("Invalid register number or password format.");
// //     }
// //   };

// //   return (
// //     <div className="bg-container">

// //       <div className="form-container">
// //         <h2>NEC Gate Pass</h2>
// //         <div className="logo">
// //           <img
// //             src="/images/logo.jpeg"
// //             alt="Logo"
// //             width="100px"
// //             height="100px"
// //           />
// //         </div>

// //         <form onSubmit={handleLogin}>
// //           <input
// //             type="text"
// //             placeholder="Register Number"
// //             value={registerNumber}
// //             onChange={(e) => setRegisterNumber(e.target.value)}
// //             required
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password (e.g., name@123)"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //           <button type="submit">Log in</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginForm;
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../styles/LoginForm.css";

// // const LoginForm = () => {
// //   const [registerNumber, setRegisterNumber] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = (e) => {
// //     e.preventDefault();

// //     const isRegisterNumberValid = /^\d{7}$/.test(registerNumber);

// //     if (!isRegisterNumberValid) {
// //       alert("Invalid Register Number format.");
// //       return;
// //     }

// //     if (password === "12345678") {
// //       alert("Login successful! Please reset your password.");
// //       navigate("/reset-password", { state: { registerNumber } });
// //       return;
// //     }

// //     const isPasswordValid = /^[a-zA-Z]+@\d+$/.test(password);
// //     if (isPasswordValid) {
// //       alert("Login successful!");
// //       navigate("/dashboard");
// //     } else {
// //       alert("Invalid password format.");
// //     }
// //   };

// //   return (
// //     <div className="bg-container">
// //       <div className="form-container">
// //         <h2>NEC Gate Pass</h2>
// //         <div className="logo">
// //           <img
// //             src="/images/logo.jpeg"
// //             alt="Logo"
// //             width="100px"
// //             height="100px"
// //           />
// //         </div>

// //         <form onSubmit={handleLogin}>
// //           <input
// //             type="text"
// //             placeholder="Register Number"
// //             value={registerNumber}
// //             onChange={(e) => setRegisterNumber(e.target.value)}
// //             required
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //           <button type="submit">Log in</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginForm;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/LoginForm.css";

// const StaffsLogin= () => {
//   const [registerNumber, setRegisterNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Clear error message after 3 seconds
//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         setError("");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");

//     // Validate register number (7 digits)
//     const isRegisterNumberValid = /^\d{7}$/.test(registerNumber);
//     if (!isRegisterNumberValid) {
//       setError("Register number must be 7 digits");
//       return;
//     }

//     // Check if it's the default password (123456)
//     if (password === "123456") {
//       // Redirect to password reset page with register number
//       navigate("/reset-password", { state: { registerNumber } });
//       return;
//     }

//     // Check if password follows pattern (letters@numbers)
//     const isPasswordValid = /^[a-zA-Z]+@\d+$/.test(password);
//     if (isPasswordValid) {
//       // Successful login, redirect to gate pass page
//       navigate("/gatepass");
//     } else {
//       setError("Invalid password format. Use letters@numbers (e.g., user@123)");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <div className="logo">
//             <img src="/images/logo.jpeg" alt="NEC Logo" />
//           </div>
//           <h2>NEC Gate Pass</h2>
//           <h2>StaffsApproval Login</h2>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleLogin} className="auth-form">
//           <div className="form-group">
//             <label htmlFor="registerNumber">Register Number</label>
//             <input
//               type="text"
//               id="registerNumber"
//               placeholder="Enter 7-digit register number"
//               value={registerNumber}
//               onChange={(e) => setRegisterNumber(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="auth-button">
//             Login
//           </button>
//         </form>

//         <div className="auth-footer">
//           <p>© {new Date().getFullYear()} NEC Gate Pass System</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StaffsLogin;
//new

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/LoginForm.css";
// import Footer from "./Footer";

// const StaffsLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Clear error message after 3 seconds
//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => {
//         setError("");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");

//     // Validate email format
//     const isEmailValid =
//       /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
//     if (!isEmailValid) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     // Check if it's the default password (123456)
//     if (password === "123456") {
//       // Redirect to password reset page with email
//       navigate("/reset-password", { state: { email } });
//       return;
//     }

//     // Check if password follows pattern (letters@numbers)
//     const isPasswordValid = /^[a-zA-Z]+@\d+$/.test(password);
//     if (isPasswordValid) {
//       // Successful login, redirect to gate pass page
//       navigate("/staffs-approval");
//     } else {
//       setError("Invalid password format. Use letters@numbers (e.g., user@123)");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <div className="logo">
//             <img src="/images/logo.jpeg" alt="NEC Logo" />
//           </div>
//           <h2>NEC Gate Pass</h2>
//           <h2>Staff Approval Login</h2>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleLogin} className="auth-form">
//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit" className="auth-button">
//             Login
//           </button>
//         </form>

//         <div className="auth-footer">
//           <p>© {new Date().getFullYear()} NEC Gate Pass System</p>
//         </div>
//       </div> 
//     </div>
//   );
// };

// export default StaffsLogin;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import Footer from "./Footer"; 

const StaffsLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    if (!isEmailValid) {
      setError("Please enter a valid email address");
      return;
    }

    if (password === "123456") {
      navigate("/reset-password", { state: { email } });
      return;
    }

    const isPasswordValid = /^[a-zA-Z]+@\d+$/.test(password);
    if (isPasswordValid) {
      navigate("/staffs-approval");
    } else {
      setError("Invalid password format. Use letters@numbers (e.g., user@123)");
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo">
              <img src="/images/logo.jpeg" alt="NEC Logo" />
            </div>
            <h2>NEC Gate Pass</h2>
            <h2>Staff Approval Login</h2>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Global Footer */}
      <Footer />
    </>
  );
};

export default StaffsLogin;
