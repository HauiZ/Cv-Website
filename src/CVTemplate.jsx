import React, { useRef } from "react";
import { jsPDF } from "jspdf";

const CVTemplate = () => {
  const pdfRef = useRef(null);

  const downloadPDF = () => {
    if (!pdfRef.current) {
      console.error("PDF ref is null.");
      return;
    }
    
    const doc = new jsPDF("p", "mm", "a4");

    doc.html(pdfRef.current, {
      callback: (doc) => {
        doc.save("CV_Template.pdf");
      },
      x: 10,
      y: 10,
      width: 180,
      windowWidth: pdfRef.current.scrollWidth,
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {/* CV Content */}
      <div ref={pdfRef} style={{ backgroundColor: "white", padding: "20px", width: "80%", margin: "auto", border: "1px solid #ddd" }}>
        <h1 style={{ color: "blue" }}>John Doe</h1>
        <p>Software Engineer</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default CVTemplate;
