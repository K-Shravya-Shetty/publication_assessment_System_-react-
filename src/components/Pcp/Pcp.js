import React, { useState } from "react";
import "./Pcp.css";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

function Pcp() {
  const [amount, setAmount] = useState("");
  const [approvalMessage, setApprovalMessage] = useState("");
  const [comments, setComments] = useState("");
  const [pdfFiles, setPdfFiles] = useState([]);
  const [cashAwardGiven, setCashAwardGiven] = useState(null);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const submitAmount = (e) => {
    e.preventDefault();
    if (amount) {
      setApprovalMessage(`Amount entered: INR ${amount}`);
    } else {
      setApprovalMessage("Please enter a valid amount.");
    }
  };

  const approveAmount = (e) => {
    e.preventDefault();
    setApprovalMessage(`Amount INR ${amount} approved.`);
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

  const generatePdfReport = async () => {
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
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );
        copiedPages.forEach((copiedPage) => {
          mergedPdf.addPage(copiedPage);
        });

        // Update description to include file names
        description += `\nAttached File: ${file.name}`;
      }

      // Save the merged PDF as a Blob
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });

      // Generate URL for viewing the PDF in the browser
      const pdfUrl = URL.createObjectURL(blob);
      setGeneratedPdfUrl(pdfUrl);

      // Clear uploaded files and form fields after generating report
      setPdfFiles([]);
      setAmount("");
      setComments("");
      setCashAwardGiven(null);
      setApprovalMessage("Report generated successfully.");
    } catch (error) {
      console.error("Error generating PDF report:", error);
      setApprovalMessage("Error generating PDF report. Please try again.");
    }
  };

  const downloadPdfReport = () => {
    // Download the PDF file
    const a = document.createElement("a");
    a.href = generatedPdfUrl;
    a.download = "pcp_application_report.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(generatedPdfUrl);
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
                <button onClick={submitAmount}>Submit</button>
                <p
                  id="approvalMessage"
                  style={{ color: amount ? "blue" : "red" }}
                >
                  {approvalMessage}
                </p>
                {amount && (
                  <button
                    id="approveButton"
                    onClick={approveAmount}
                    style={{ display: "inline-block" }}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Enter the Remarks/Comments(if any)</strong>
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
              </td>
            </tr>
            <tr>
              <td>
                {generatedPdfUrl && (
                  <button type="button" onClick={downloadPdfReport}>
                    Download Report
                  </button>
                )}
                <button type="button" onClick={generatePdfReport}>
                  Generate Report
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {generatedPdfUrl && (
        <div className="pdf-viewer">
          <iframe
            title="Generated PDF Report"
            src={generatedPdfUrl}
            width="100%"
            height="600px"
          />
        </div>
      )}
    </div>
  );
}

export default Pcp;
