import React, { useState } from "react";
import "./Pcp.css";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

function Pcp() {
  const [amount, setAmount] = useState("");
  const [approvalMessage, setApprovalMessage] = useState("");
  const [comments, setComments] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [cashAwardGiven, setCashAwardGiven] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null); // New state variable for download URL

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setPdfFiles([...pdfFiles, ...files]);
  };

  const handleRadioChange = (e) => {
    setCashAwardGiven(e.target.value === "yes");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();

      // Font setup for PDF
      const font = await mergedPdf.embedFont(StandardFonts.Helvetica);

      // Title and description
      const title = "PCP Application Report";
      let description = `Details:
        Amount: INR ${amount}
        Comments: ${comments}
        Cash Award Given: ${cashAwardGiven ? "YES" : "NO"}`;

      // Add a new page to the PDF
      const page = mergedPdf.addPage();
      const { width, height } = page.getSize();

      // Draw title and description
      page.drawText(title, {
        x: 50,
        y: height - 50,
        size: 24,
        font,
        color: rgb(0, 0, 0),
      });
      page.drawText(description, {
        x: 50,
        y: height - 100,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      });

      // Iterate through each uploaded file
      for (const file of pdfFiles) {
        // Load each PDF
        const pdfBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);

        // Get pages of each PDF and copy to the merged PDF
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((copiedPage) => {
          mergedPdf.addPage(copiedPage);
        });

        // Update description to include file names
        description += `\nAttached File: ${file.name}`;
      }

      // Save the merged PDF as a Blob
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });

      // Create a URL for the Blob and set it in the state
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Upload PDF to server
      const formData = new FormData();
      formData.append("file", blob, "pcp_application_report.pdf");
      formData.append("amount", amount);
      formData.append("comments", comments);
      formData.append("cashAwardGiven", cashAwardGiven);

      const response = await fetch("http://localhost:3001/uploadPcpReport", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setApprovalMessage("Report generated and uploaded successfully.");
      } else {
        setApprovalMessage("Error uploading PDF report. Please try again.");
      }

      // Clear form fields
      setPdfFiles([]);
      setAmount("");
      setComments("");
      setCashAwardGiven(null);
    } catch (error) {
      console.error("Error generating PDF report:", error);
      setApprovalMessage("Error generating PDF report. Please try again.");
    }
  };

  const downloadPdf = () => {
    // Trigger the download
    if (downloadUrl) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "pcp_application_report.pdf";
      link.click();
    }
  };

  return (
    <div className="App">
      <form>
        <h1>Assessment Committee Proceedings</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Cash award maybe given</strong>
              </td>
              <td>
                <input
                  type="radio"
                  name="cashAwardGiven"
                  id="opt1"
                  value="yes"
                  checked={cashAwardGiven === true}
                  onChange={handleRadioChange}
                />
                <label htmlFor="opt1" className="label1">
                  <span>YES</span>
                </label>
                <input
                  type="radio"
                  name="cashAwardGiven"
                  id="opt2"
                  value="no"
                  checked={cashAwardGiven === false}
                  onChange={handleRadioChange}
                />
                <label htmlFor="opt2" className="label2">
                  <span>NO</span>
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Amount of cash award recommended</strong>
              </td>
              <td id="amountCell">
                <input
                  type="number"
                  id="amount"
                  placeholder="Enter amount (INR)"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Enter the Remarks/Comments (if any)</strong>
              </td>
              <td id="remarksCell">
                <textarea
                  id="comments"
                  placeholder="Enter remarks/comments (if any)"
                  rows="4"
                  cols="50"
                  value={comments}
                  onChange={handleCommentsChange}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td id="uploadCell">
                <label>
                  <strong>
                    Supporting document for Scopus indexing of article (if
                    exists):
                  </strong>
                </label>
                <input
                  type="file"
                  id="scopusDoc"
                  onChange={handleFileChange}
                  accept=".pdf"
                />
                <br />
                <br />
                <label>
                  <strong>
                    Supporting document for Impact Factor of article (if
                    exists):
                  </strong>
                </label>
                <input
                  type="file"
                  id="impactFactorDoc1"
                  onChange={handleFileChange}
                  accept=".pdf"
                />
                <br />
                <br />
                <label>
                  <strong>
                    Supporting document for Impact Factor of article (if
                    exists):
                  </strong>
                </label>
                <input
                  type="file"
                  id="impactFactorDoc2"
                  onChange={handleFileChange}
                  accept=".pdf"
                />
                <br />
                <br />
                <label>
                  <strong>Any other relevant document (if any):</strong>
                </label>
                <input
                  type="file"
                  id="otherDoc"
                  onChange={handleFileChange}
                  accept=".pdf"
                />
                <br />
                <br />
                <label>
                  <strong>Additional document (if any):</strong>
                </label>
                <input
                  type="file"
                  id="additionalDoc"
                  onChange={handleFileChange}
                  accept=".pdf"
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit" onClick={submitForm}>
                  Submit
                </button>
                {downloadUrl && (
                  <button type="button" onClick={downloadPdf}>
                    Download PDF
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {approvalMessage && (
        <p id="approvalMessage" style={{ color: "blue" }}>
          {approvalMessage}
        </p>
      )}
    </div>
  );
}

export default Pcp;
