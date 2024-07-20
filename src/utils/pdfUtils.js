// import jsPDF from 'jspdf';


// export const generatePdf = (formData) => {
//   const doc = new jsPDF();
  
//   // Example content, replace with your actual content generation logic
//   doc.text(`Name: ${formData.name}`, 10, 10);
//   doc.text(`Department: ${formData.department}`, 10, 20);
//   // Add more text or structured content as needed

//   return doc.output('blob'); // Output as blob for saving
// };

// pdfUtils.js



import { saveAs } from 'file-saver';

// Your PDF generation logic here
export const generatePdf = (content, fileName) => {
  const doc = new jsPDF();
  doc.text(content, 10, 10);
  doc.save(`${fileName}.pdf`);
};

// Example usage
export const downloadPdf = (content, fileName) => {
  const blob = new Blob([content], { type: 'application/pdf' });
  saveAs(blob, `${fileName}.pdf`);
};

