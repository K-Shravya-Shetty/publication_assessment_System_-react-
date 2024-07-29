import React, { useState } from "react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import axios from "axios";
import html2canvas from "html2canvas";
import "./NewApplication.css";

const NewApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
    phoneNumber: "",
    titleOfPublication: "",
    coAuthors: "",
    typeOfPublication: "international",
    application: "conference-pub",
    conferenceDetails: {
      name: "",
      venue: "",
      date: "",
      publisher: "",
      indexing: "",
      fee: "",
      payment: "",
      support: "",
    },
    journalDetails: {
      name: "",
      date: "",
      publisher: "",
      indexing: "",
      impactFactor: "",
      sjr: "",
    },
    bookChapterDetails: {
      name: "",
      editors: "",
      date: "",
      publisher: "",
      indexing: "",
      impactFactor: "",
      sjr: "",
    },
    bookDetails: {
      name: "",
      authors: "",
      date: "",
      publisher: "",
      isbn: "",
      issn: "",
    },
  });

  /*const [generatedPdfUrl, setGeneratedPdfUrl] = useState("");*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (section, e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [name]: value,
      },
    });
  };

  const handleApplicationChange = (e) => {
    setFormData({ ...formData, application: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate the PDF
    const reportContent = document.getElementById("report-content");
    const canvas = await html2canvas(reportContent);
    const imgData = canvas.toDataURL("image/png");

    // Generate PDF
    const doc = new jsPDF();
    doc.addImage(imgData, "PNG", 10, 10);
    const pdfBlob = doc.output("blob");

    // Save the PDF
    saveAs(pdfBlob, "report.pdf");

    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("access_key", "e71edb57-9c67-4c64-8e61-8c48b2c8b33d");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  /*const handleGenerateReport = async () => {
    const reportContent = document.getElementById("report-content");

    // Capture the content as a canvas
    const canvas = await html2canvas(reportContent);
    const imgData = canvas.toDataURL("image/png");

    // Generate PDF
    const doc = new jsPDF();
    doc.addImage(imgData, "PNG", 10, 10);
    const pdfBlob = doc.output("blob");

    // Create a Blob URL for the PDF and trigger the download
    // saveAs(pdfBlob, 'report.pdf');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setGeneratedPdfUrl(pdfUrl);
  };

  const handleDownloadReport = () => {
    // handleGenerateReport();
    if (generatedPdfUrl) {
      saveAs(generatedPdfUrl, "report.pdf");
    } else {
      handleGenerateReport();
    }
  };*/
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>New Application</h1>
        <h3>Faculty Details</h3>
        <div className="drop-down">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <label className="form-label">Department:</label>
          <select
            className="option"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ICBS">ICBS</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
          <br />
        </div>
        <label className="form-label">Email Id:</label>
        <input
          type="email"
          className="form-input"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label className="form-label">Phone Number:</label>
        <input
          type="text"
          className="form-input"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <br />
        <h3>Publication Details</h3>
        <label className="form-label">Title of publication:</label>
        <input
          type="text"
          className="form-input"
          name="titleOfPublication"
          value={formData.titleOfPublication}
          onChange={handleChange}
        />
        <br />
        <label className="form-label">Co-Authors:</label>
        <input
          type="text"
          className="form-input"
          name="coAuthors"
          value={formData.coAuthors}
          onChange={handleChange}
        />
        <br />
        <label className="form-label">Type of publication:</label>
        <br />
        <div className="radio-btn-container">
          <input
            type="radio"
            name="typeOfPublication"
            value="national"
            checked={formData.typeOfPublication === "national"}
            onChange={handleChange}
            className="radio-btn"
          />
          <label className="form-label">National</label>
          <br />
        </div>
        <div className="radio-btn-container">
          <input
            type="radio"
            name="typeOfPublication"
            value="international"
            checked={formData.typeOfPublication === "international"}
            onChange={handleChange}
            className="radio-btn"
          />
          <label className="form-label">International</label>
          <br />
        </div>
        <h3>Application For</h3>
        <div className="radio-btn-container">
          <input
            type="radio"
            name="application"
            value="conference-reg"
            checked={formData.application === "conference-reg"}
            onChange={handleApplicationChange}
            className="radio-btn"
            id="conference-reg"
          />
          <label className="form-label">
            Conference Registration/Publication Support
          </label>
          <br />
        </div>
        <div className="radio-btn-container">
          <input
            type="radio"
            name="application"
            value="conference-pub"
            checked={formData.application === "conference-pub"}
            onChange={handleApplicationChange}
            className="radio-btn"
            id="conference-pub"
          />
          <label className="form-label">
            Cash Award for Conference Publication
          </label>
          <br />
        </div>
        <div className="radio-btn-container">
          <input
            type="radio"
            name="application"
            value="journal-pub"
            checked={formData.application === "journal-pub"}
            onChange={handleApplicationChange}
            className="radio-btn"
            id="journal-pub"
          />
          <label className="form-label">
            Cash Award for Journal Publication
          </label>
          <br />
        </div>
        <div className="radio-btn-container">
          <input
            type="radio"
            name="application"
            value="book-chp-pub"
            checked={formData.application === "book-chp-pub"}
            onChange={handleApplicationChange}
            className="radio-btn"
            id="book-chp-pub"
          />
          <label className="form-label">Cash Award for Book Chapter</label>
          <br />
        </div>
        <div className="radio-btn-container">
          <input
            type="radio"
            name="application"
            value="book"
            checked={formData.application === "book"}
            onChange={handleApplicationChange}
            className="radio-btn"
            id="book"
          />
          <label className="form-label">Cash Award for Book</label>
          <br />
        </div>

        {formData.application === "conference-reg" && (
          <div>
            <h4>Conference Registration/Publication Support Details</h4>
            <label className="form-label">Name of the conference:</label>
            <input
              type="text"
              className="form-input"
              name="name"
              value={formData.conferenceDetails.name}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Venue:</label>
            <input
              type="text"
              className="form-input"
              name="venue"
              value={formData.conferenceDetails.venue}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Date of the conference:</label>
            <input
              type="date"
              className="form-input"
              name="date"
              value={formData.conferenceDetails.date}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Publisher:</label>
            <input
              type="text"
              className="form-input"
              name="publisher"
              value={formData.conferenceDetails.publisher}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Type of indexing:</label>
            <input
              type="text"
              className="form-input"
              name="indexing"
              value={formData.conferenceDetails.indexing}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Conference fee:</label>
            <input
              type="text"
              className="form-input"
              name="fee"
              value={formData.conferenceDetails.fee}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Fee payment mode:</label>
            <input
              type="text"
              className="form-input"
              name="payment"
              value={formData.conferenceDetails.payment}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Support provided:</label>
            <input
              type="text"
              className="form-input"
              name="support"
              value={formData.conferenceDetails.support}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
          </div>
        )}

        {formData.application === "conference-pub" && (
          <div>
            <h4>Conference Publication Details</h4>
            <label className="form-label">Name of the conference:</label>
            <input
              type="text"
              className="form-input"
              name="name"
              value={formData.conferenceDetails.name}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Date of the conference:</label>
            <input
              type="date"
              className="form-input"
              name="date"
              value={formData.conferenceDetails.date}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Publisher:</label>
            <input
              type="text"
              className="form-input"
              name="publisher"
              value={formData.conferenceDetails.publisher}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Type of indexing:</label>
            <input
              type="text"
              className="form-input"
              name="indexing"
              value={formData.conferenceDetails.indexing}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Conference fee:</label>
            <input
              type="text"
              className="form-input"
              name="fee"
              value={formData.conferenceDetails.fee}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Fee payment mode:</label>
            <input
              type="text"
              className="form-input"
              name="payment"
              value={formData.conferenceDetails.payment}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
            <label className="form-label">Support provided:</label>
            <input
              type="text"
              className="form-input"
              name="support"
              value={formData.conferenceDetails.support}
              onChange={(e) => handleNestedChange("conferenceDetails", e)}
            />
            <br />
          </div>
        )}

        {formData.application === "journal-pub" && (
          <div>
            <h4>Journal Publication Details</h4>
            <label className="form-label">Name of the journal:</label>
            <input
              type="text"
              className="form-input"
              name="name"
              value={formData.journalDetails.name}
              onChange={(e) => handleNestedChange("journalDetails", e)}
            />
            <br />
            <label className="form-label">Date of publication:</label>
            <input
              type="date"
              className="form-input"
              name="date"
              value={formData.journalDetails.date}
              onChange={(e) => handleNestedChange("journalDetails", e)}
            />
            <br />
            <label className="form-label">Publisher:</label>
            <input
              type="text"
              className="form-input"
              name="publisher"
              value={formData.journalDetails.publisher}
              onChange={(e) => handleNestedChange("journalDetails", e)}
            />
            <br />
            <label className="form-label">Type of indexing:</label>
            <input
              type="text"
              className="form-input"
              name="indexing"
              value={formData.journalDetails.indexing}
              onChange={(e) => handleNestedChange("journalDetails", e)}
            />
            <br />
            <label className="form-label">Impact Factor:</label>
            <input
              type="text"
              className="form-input"
              name="impactFactor"
              value={formData.journalDetails.impactFactor}
              onChange={(e) => handleNestedChange("journalDetails", e)}
            />
            <br />
            <label className="form-label">SJR:</label>
            <input
              type="text"
              className="form-input"
              name="sjr"
              value={formData.journalDetails.sjr}
              onChange={(e) => handleNestedChange("journalDetails", e)}
            />
            <br />
          </div>
        )}

        {formData.application === "book-chp-pub" && (
          <div>
            <h4>Book Chapter Details</h4>
            <label className="form-label">Title of the book:</label>
            <input
              type="text"
              className="form-input"
              name="name"
              value={formData.bookChapterDetails.name}
              onChange={(e) => handleNestedChange("bookChapterDetails", e)}
            />
            <br />
            <label className="form-label">Editors:</label>
            <input
              type="text"
              className="form-input"
              name="editors"
              value={formData.bookChapterDetails.editors}
              onChange={(e) => handleNestedChange("bookChapterDetails", e)}
            />
            <br />
            <label className="form-label">Date of publication:</label>
            <input
              type="date"
              className="form-input"
              name="date"
              value={formData.bookChapterDetails.date}
              onChange={(e) => handleNestedChange("bookChapterDetails", e)}
            />
            <br />
            <label className="form-label">Publisher:</label>
            <input
              type="text"
              className="form-input"
              name="publisher"
              value={formData.bookChapterDetails.publisher}
              onChange={(e) => handleNestedChange("bookChapterDetails", e)}
            />
            <br />
            <label className="form-label">Type of indexing:</label>
            <input
              type="text"
              className="form-input"
              name="indexing"
              value={formData.bookChapterDetails.indexing}
              onChange={(e) => handleNestedChange("bookChapterDetails", e)}
            />
            <br />
            <label className="form-label">Impact Factor:</label>
            <input
              type="text"
              className="form-input"
              name="impactFactor"
              value={formData.bookChapterDetails.impactFactor}
              onChange={(e) => handleNestedChange("bookChapterDetails", e)}
            />
            <br />
            <label className="form-label">SJR:</label>
            <input
              type="text"
              className="form-input"
              name="sjr"
              value={formData.bookChapterDetails.sjr}
              onChange={(e) => handleNestedChange("bookChapterDetails", e)}
            />
            <br />
          </div>
        )}

        {formData.application === "book" && (
          <div>
            <h4>Book Details</h4>
            <label className="form-label">Title of the book:</label>
            <input
              type="text"
              className="form-input"
              name="name"
              value={formData.bookDetails.name}
              onChange={(e) => handleNestedChange("bookDetails", e)}
            />
            <br />
            <label className="form-label">Authors:</label>
            <input
              type="text"
              className="form-input"
              name="authors"
              value={formData.bookDetails.authors}
              onChange={(e) => handleNestedChange("bookDetails", e)}
            />
            <br />
            <label className="form-label">Date of publication:</label>
            <input
              type="date"
              className="form-input"
              name="date"
              value={formData.bookDetails.date}
              onChange={(e) => handleNestedChange("bookDetails", e)}
            />
            <br />
            <label className="form-label">Publisher:</label>
            <input
              type="text"
              className="form-input"
              name="publisher"
              value={formData.bookDetails.publisher}
              onChange={(e) => handleNestedChange("bookDetails", e)}
            />
            <br />
            <label className="form-label">ISBN:</label>
            <input
              type="text"
              className="form-input"
              name="isbn"
              value={formData.bookDetails.isbn}
              onChange={(e) => handleNestedChange("bookDetails", e)}
            />
            <br />
            <label className="form-label">ISSN:</label>
            <input
              type="text"
              className="form-input"
              name="issn"
              value={formData.bookDetails.issn}
              onChange={(e) => handleNestedChange("bookDetails", e)}
            />
            <br />
          </div>
        )}

        <div id="report-content">
          <h2>Generated Report</h2>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Department:</strong> {formData.department}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {formData.phoneNumber}
          </p>
          <p>
            <strong>Title of Publication:</strong> {formData.titleOfPublication}
          </p>
          <p>
            <strong>Co-Authors:</strong> {formData.coAuthors}
          </p>
          <p>
            <strong>Type of Publication:</strong> {formData.typeOfPublication}
          </p>
          <p>
            <strong>Application:</strong> {formData.application}
          </p>

          {formData.application === "conference-reg" && (
            <div>
              <h4>Conference Registration/Publication Support Details</h4>
              <p>
                <strong>Name:</strong> {formData.conferenceDetails.name}
              </p>
              <p>
                <strong>Venue:</strong> {formData.conferenceDetails.venue}
              </p>
              <p>
                <strong>Date:</strong> {formData.conferenceDetails.date}
              </p>
              <p>
                <strong>Publisher:</strong>{" "}
                {formData.conferenceDetails.publisher}
              </p>
              <p>
                <strong>Indexing:</strong> {formData.conferenceDetails.indexing}
              </p>
              <p>
                <strong>Fee:</strong> {formData.conferenceDetails.fee}
              </p>
              <p>
                <strong>Payment Mode:</strong>{" "}
                {formData.conferenceDetails.payment}
              </p>
              <p>
                <strong>Support:</strong> {formData.conferenceDetails.support}
              </p>
            </div>
          )}

          {formData.application === "conference-pub" && (
            <div>
              <h4>Conference Publication Details</h4>
              <p>
                <strong>Name:</strong> {formData.conferenceDetails.name}
              </p>
              <p>
                <strong>Date:</strong> {formData.conferenceDetails.date}
              </p>
              <p>
                <strong>Publisher:</strong>{" "}
                {formData.conferenceDetails.publisher}
              </p>
              <p>
                <strong>Indexing:</strong> {formData.conferenceDetails.indexing}
              </p>
              <p>
                <strong>Fee:</strong> {formData.conferenceDetails.fee}
              </p>
              <p>
                <strong>Payment Mode:</strong>{" "}
                {formData.conferenceDetails.payment}
              </p>
              <p>
                <strong>Support:</strong> {formData.conferenceDetails.support}
              </p>
            </div>
          )}

          {formData.application === "journal-pub" && (
            <div>
              <h4>Journal Publication Details</h4>
              <p>
                <strong>Name:</strong> {formData.journalDetails.name}
              </p>
              <p>
                <strong>Date:</strong> {formData.journalDetails.date}
              </p>
              <p>
                <strong>Publisher:</strong> {formData.journalDetails.publisher}
              </p>
              <p>
                <strong>Indexing:</strong> {formData.journalDetails.indexing}
              </p>
              <p>
                <strong>Impact Factor:</strong>{" "}
                {formData.journalDetails.impactFactor}
              </p>
              <p>
                <strong>SJR:</strong> {formData.journalDetails.sjr}
              </p>
            </div>
          )}

          {formData.application === "book-chp-pub" && (
            <div>
              <h4>Book Chapter Details</h4>
              <p>
                <strong>Title:</strong> {formData.bookChapterDetails.name}
              </p>
              <p>
                <strong>Editors:</strong> {formData.bookChapterDetails.editors}
              </p>
              <p>
                <strong>Date:</strong> {formData.bookChapterDetails.date}
              </p>
              <p>
                <strong>Publisher:</strong>{" "}
                {formData.bookChapterDetails.publisher}
              </p>
              <p>
                <strong>Indexing:</strong>{" "}
                {formData.bookChapterDetails.indexing}
              </p>
              <p>
                <strong>Impact Factor:</strong>{" "}
                {formData.bookChapterDetails.impactFactor}
              </p>
              <p>
                <strong>SJR:</strong> {formData.bookChapterDetails.sjr}
              </p>
            </div>
          )}

          {formData.application === "book" && (
            <div>
              <h4>Book Details</h4>
              <p>
                <strong>Title:</strong> {formData.bookDetails.name}
              </p>
              <p>
                <strong>Authors:</strong> {formData.bookDetails.authors}
              </p>
              <p>
                <strong>Date:</strong> {formData.bookDetails.date}
              </p>
              <p>
                <strong>Publisher:</strong> {formData.bookDetails.publisher}
              </p>
              <p>
                <strong>ISBN:</strong> {formData.bookDetails.isbn}
              </p>
              <p>
                <strong>ISSN:</strong> {formData.bookDetails.issn}
              </p>
            </div>
          )}
        </div>

        {/* <button type="button" onClick={handleGenerateReport}>Generate Report</button> 
        <button type="button" onClick={handleDownloadReport}>
          Download Report
        </button>*/}
        <button type="submit">Genrate pdf</button>
      </form>

      <form
        action="http://localhost:3001/upload"
        method="POST"
        enctype="multipart/form-data"
      >
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default NewApplication;
