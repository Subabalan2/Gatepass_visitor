
import React, { useRef } from "react";
import "../styles/GatepassReceipt.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const Receipt = ({ pass, onClose, printReceipt }) => {
  const receiptRef = useRef();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };
  const handleDownloadPDF = () => {
    const input = receiptRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Gatepass_Receipt.pdf");
    });
  };

  return (
    <div className="receipt-overlay">
      <div className="receipt-modal">
        <div className="receipt-header">
          <h2>Gate Pass Approval Receipt</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="receipt-content" ref={receiptRef}>
          <div className="receipt-institution">
            <h1>NEC Gate Pass</h1>
            <p>OFFICIAL APPROVAL RECEIPT</p>
          </div>

          <div className="receipt-approval-info">
            <div className="receipt-approval-id">
              <span>Approval ID:</span>
              <strong>{pass.approvalId}</strong>
            </div>
            <div className="receipt-approval-date">
              <span>Approved On:</span>
              <strong>
                {formatDate(pass.approvalDate)} at{" "}
                {formatTime(pass.approvalDate)}
              </strong>
            </div>
          </div>

          <div className="receipt-details">
            <div className="receipt-field">
              <span className="label">Student Name:</span>
              <span className="value">{pass.name}</span>
            </div>

            <div className="receipt-row">
              <div className="receipt-field">
                <span className="label">Department:</span>
                <span className="value">{pass.dpmt}</span>
              </div>
              <div className="receipt-field">
                <span className="label">Year:</span>
                <span className="value">{pass.year}</span>
              </div>
            </div>

            <div className="receipt-field">
              <span className="label">Purpose:</span>
              <span className="value">{pass.purpose}</span>
            </div>

            <div className="receipt-row">
              <div className="receipt-field">
                <span className="label">Date:</span>
                <span className="value">{formatDate(pass.date)}</span>
              </div>
              <div className="receipt-field">
                <span className="label">Departure Time:</span>
                <span className="value">{pass.time}</span>
              </div>
            </div>

            <div className="receipt-field">
              <span className="label">Return Time:</span>
              <span className="value">
                {pass.returnTime
                  ? `${pass.returnTime} ${pass.returnampm || ""}`
                  : "Not specified"}
              </span>
            </div>

            <div className="receipt-row">
              <div className="receipt-field">
                <span className="label">Tutor Approval:</span>
                <span className="value">{pass.tutor}</span>
              </div>
              <div className="receipt-field">
                <span className="label">HOD Approval:</span>
                <span className="value">Approved</span>
              </div>
            </div>
          </div>

          <div className="receipt-verification">
            <div className="qr-placeholder">
              {/* QR code would be generated here */}
              <div className="qr-box"></div>
              <span>Scan to verify</span>
            </div>

            <div className="receipt-stamp">
              <div className="stamp-box">APPROVED</div>
              <div className="signature-line"></div>
              <span>HOD Signature</span>
            </div>
          </div>

          <div className="receipt-footer">
            <p>This is an official gate pass approval document.</p>
            <p>Present this receipt at the campus gate when departing.</p>
          </div>
        </div>

        <div className="receipt-actions">
          <button className="print-btn" onClick={printReceipt}>
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
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print Receipt
          </button>
          <button className="download-btn" onClick={handleDownloadPDF}>
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
