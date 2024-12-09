import React, { useState } from "react";
import { FaFileDownload, FaChartLine } from "react-icons/fa"; // Icons for downloading and charts
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material"; // Material-UI components
import CloseIcon from '@mui/icons-material/Close';

// Dummy reports data
const dummyReports = [
  { id: 1, title: "Sales Report - Q1 2024", generatedAt: "2024-04-01", type: "Sales", details: "Detailed insights about Q1 sales performance." },
  { id: 2, title: "User Growth - March 2024", generatedAt: "2024-03-28", type: "Growth", details: "Analysis of user growth for March 2024." },
  { id: 3, title: "Monthly Performance - February 2024", generatedAt: "2024-02-25", type: "Performance", details: "Performance metrics for February 2024." },
];

function Reports() {
  const [reports, setReports] = useState(dummyReports);
  const [selectedReport, setSelectedReport] = useState(null); // State to manage the selected report
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Handle downloading a report
  const handleDownloadReport = (id) => {
    const report = reports.find((report) => report.id === id);
    const reportData = `Title: ${report.title}\nGenerated At: ${report.generatedAt}\nType: ${report.type}\nDetails: ${report.details}`;
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`; // Filename sanitized
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  // Handle viewing a report
  const handleViewReport = (id) => {
    const report = reports.find((report) => report.id === id);
    setSelectedReport(report); // Set the selected report to display
    setIsModalOpen(true); // Open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null); // Clear the selected report
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter reports based on search query
  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>View Reports</h2>

      {/* Search section */}
      <Box display="flex" alignItems="center" marginBottom="20px">
        <TextField
          label="Search Reports"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', flex: 1 }}
        />
        <Button variant="contained" style={{ backgroundColor: '#2196F3', color: 'white' }}>
          Search
        </Button>
      </Box>

      {/* Table for displaying reports */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Generated At</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report) => (
            <tr key={report.id}>
              <td style={styles.td}>{report.title}</td>
              <td style={styles.td}>{report.generatedAt}</td>
              <td style={styles.td}>{report.type}</td>
              <td style={styles.td}>
                <button onClick={() => handleViewReport(report.id)} style={styles.viewButton}>
                  <FaChartLine /> View
                </button>
                <button onClick={() => handleDownloadReport(report.id)} style={styles.downloadButton}>
                  <FaFileDownload /> Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying report details */}
      {isModalOpen && selectedReport && (
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedReport?.title}
            <IconButton
              aria-label="close"
              onClick={closeModal}
              style={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <p>{selectedReport?.details}</p>
            <p><strong>Type:</strong> {selectedReport?.type}</p>
            <p><strong>Generated At:</strong> {selectedReport?.generatedAt}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
  },
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
  viewButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "5px",
  },
  downloadButton: {
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  modal: {
    position: "fixed",
    zIndex: 1000,
    left: 0,
    top: 0,
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    margin: "15% auto",
    padding: "20px",
    border: "1px solid #888",
    width: "80%",
    maxWidth: "600px",
    position: "relative",
  },
  closeButton: {
    color: "#aaa",
    float: "right",
    fontSize: "28px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Reports;


/*import React, { useState } from "react";  
import { FaFileDownload, FaChartLine } from "react-icons/fa"; // Icons for downloading and charts  

// Simulating report data  
const dummyReports = [  
  { id: 1, title: "Sales Report - Q1 2024", generatedAt: "2024-04-01", type: "Sales", details: "Detailed insights about Q1 sales performance." },  
  { id: 2, title: "User Growth - March 2024", generatedAt: "2024-03-28", type: "Growth", details: "Analysis of user growth for March 2024." },  
  { id: 3, title: "Monthly Performance - February 2024", generatedAt: "2024-02-25", type: "Performance", details: "Performance metrics for February 2024." },  
];  

function Reports() {  
  const [reports, setReports] = useState(dummyReports);  
  const [selectedReport, setSelectedReport] = useState(null); // State to manage the selected report  
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility  

  // Handle downloading a report  
  const handleDownloadReport = (id) => {  
    const report = reports.find((report) => report.id === id);  
    const reportData = `Title: ${report.title}\nGenerated At: ${report.generatedAt}\nType: ${report.type}\nDetails: ${report.details}`;  
    const blob = new Blob([reportData], { type: 'text/plain' });  
    const url = URL.createObjectURL(blob);  
    const a = document.createElement('a');  
    a.href = url;  
    a.download = `${report.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`; // Filename sanitized  
    document.body.appendChild(a);  
    a.click();  
    document.body.removeChild(a);  
    URL.revokeObjectURL(url); // Clean up the URL object  
  };  

  // Handle viewing a report  
  const handleViewReport = (id) => {  
    const report = reports.find((report) => report.id === id);  
    setSelectedReport(report); // Set the selected report to display  
    setIsModalOpen(true); // Open the modal  
  };  

  // Function to close the modal  
  const closeModal = () => {  
    setIsModalOpen(false);  
    setSelectedReport(null); // Clear the selected report  
  };  

  return (  
    <div style={styles.container}>  
      <h2 style={styles.title}>View Reports</h2> */

      {/* Table for displaying reports */}  
      /*<table style={styles.table}>  
        <thead>  
          <tr>  
            <th style={styles.th}>Title</th>  
            <th style={styles.th}>Generated At</th>  
            <th style={styles.th}>Type</th>  
            <th style={styles.th}>Actions</th>  
          </tr>  
        </thead>  
        <tbody>  
          {reports.map((report) => (  
            <tr key={report.id}>  
              <td style={styles.td}>{report.title}</td>  
              <td style={styles.td}>{report.generatedAt}</td>  
              <td style={styles.td}>{report.type}</td>  
              <td style={styles.td}>  
                <button onClick={() => handleViewReport(report.id)} style={styles.viewButton}>  
                  <FaChartLine /> View  
                </button>  
                <button onClick={() => handleDownloadReport(report.id)} style={styles.downloadButton}>  
                  <FaFileDownload /> Download  
                </button>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  */

      {/* Modal for displaying report details */}  
     /* {isModalOpen && selectedReport && (  
        <div style={styles.modal}>  
          <div style={styles.modalContent}>  
            <span style={styles.closeButton} onClick={closeModal}>&times;</span>  
            <h2>{selectedReport.title}</h2>  
            <p><strong>Type:</strong> {selectedReport.type}</p>  
            <p><strong>Generated At:</strong> {selectedReport.generatedAt}</p>  
            <p><strong>Details:</strong> {selectedReport.details}</p>  
          </div>  
        </div>  
      )}  
    </div>  
  );  
}  

const styles = {  
  container: {  
    padding: "20px",  
    backgroundColor: "#ffffff",  
  },  
  title: {  
    fontSize: "24px",  
    marginBottom: "20px",  
  },  
  table: {  
    width: "100%",  
    borderCollapse: "collapse",  
    margin: "20px 0",  
  },  
  th: {  
    border: "1px solid #ddd",  
    padding: "10px",  
    textAlign: "left",  
    backgroundColor: "#f2f2f2",  
  },  
  td: {  
    border: "1px solid #ddd",  
    padding: "10px",  
  },  
  viewButton: {  
    backgroundColor: "#4CAF50",  
    color: "white",  
    border: "none",  
    padding: "5px 10px",  
    cursor: "pointer",  
    borderRadius: "5px",  
    marginRight: "5px",  
  },  
  downloadButton: {  
    backgroundColor: "#2196F3",  
    color: "white",  
    border: "none",  
    padding: "5px 10px",  
    cursor: "pointer",  
    borderRadius: "5px",  
  },  
  modal: {  
    position: "fixed",  
    zIndex: 1000,  
    left: 0,  
    top: 0,  
    width: "100vw",  
    height: "100vh",  
    overflow: "auto",  
    backgroundColor: "rgba(0, 0, 0, 0.5)",  
  },  
  modalContent: {  
    backgroundColor: "#fff",  
    margin: "15% auto",  
    padding: "20px",  
    border: "1px solid #888",  
    width: "80%",  
    maxWidth: "600px",  
    position: "relative",  
  },  
  closeButton: {  
    color: "#aaa",  
    float: "right",  
    fontSize: "28px",  
    fontWeight: "bold",  
    cursor: "pointer",  
  },  
};  

export default Reports;*/
