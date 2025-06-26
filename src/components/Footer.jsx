// import React from "react";
// import "../styles/footer.css";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-section support">
//           <h3>For Technical Support</h3>
//           <p>Dr. D. Venkatkumar M.E.,Ph.D</p>
//           <p>Professor / Mechanical Engineering</p>
//           <p>Email: dvkmech@nec.edu.in</p>
//           <p>Ph: 9443660339</p>
//         </div>

//         <div className="footer-section info">
//           <h3>Info</h3>
//           <a href="#" className="website-link">
//             NEC WEBSITE
//           </a>
//         </div>

//         <div className="footer-section contact">
//           <h3>Contact Us</h3>
//           <p>National Engineering College, K.R. Nagar,</p>
//           <p>Kovilpatti - 628503, Thoothukudi District,</p>
//           <p>Tamilnadu</p>
//           <p className="phone">
//             <span className="icon">📞</span> Phone : 04632 - 222 502 93859
//             76674,
//           </p>
//           <p className="phone-ext">93859 76684</p>
//           <p className="email">
//             <span className="icon">✉️</span> Email :{" "}
//             <a href="mailto:principal@nec.edu.in">principal@nec.edu.in</a>
//           </p>
//         </div>

//        <div className="footer-section social">
//   <h3>Follow Us</h3>
//   <div className="social-icons">
//     <a href="#" className="social-icon facebook" title="Facebook">
//       <i className="fab fa-facebook-f"></i>
//     </a>
//     <a href="#" className="social-icon instagram" title="Instagram">
//       <i className="fab fa-instagram"></i>
//     </a>
//     <a href="#" className="social-icon twitter" title="Twitter">
//       <i className="fab fa-twitter"></i>
//     </a>
//   </div>
// </div>


//       <div className="footer-bottom">
//         <p>Powered by NEC LMS</p>
//         <a href="#" className="back-to-top">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <polyline points="18 15 12 9 6 15"></polyline>
//           </svg>
//         </a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section support">
          <h3>For Technical Support</h3>
          <p>Dr. D. Venkatkumar M.E., Ph.D</p>
          <p>Professor / Mechanical Engineering</p>
          <p>Email: dvkmech@nec.edu.in</p>
          <p>Ph: 9443660339</p>
        </div>

        <div className="footer-section info">
          <h3>Info</h3>
          <a href="#" className="website-link">
            NEC WEBSITE
          </a>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>National Engineering College, K.R. Nagar,</p>
          <p>Kovilpatti - 628503, Thoothukudi District,</p>
          <p>Tamilnadu</p>
          <p className="phone">
            <span className="icon">📞</span> Phone : 04632 - 222 502 93859
            76674,
          </p>
          <p className="phone-ext">93859 76684</p>
          <p className="email">
            <span className="icon">✉️</span> Email :{" "}
            <a href="mailto:principal@nec.edu.in">principal@nec.edu.in</a>
          </p>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" className="social-icon facebook" title="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon instagram" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon twitter" title="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Powered by NEC LMS</p>
        <a href="#" className="back-to-top" title="Back to Top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
