import React, { useState } from "react";
import { FaFileDownload, FaChartLine } from "react-icons/fa"; // Icons for downloading and charts

// Simulating report data
const dummyReports = [
  { id: 1, title: "Sales Report - Q1 2024", generatedAt: "2024-04-01", type: "Sales" },
  { id: 2, title: "User Growth - March 2024", generatedAt: "2024-03-28", type: "Growth" },
  { id: 3, title: "Monthly Performance - February 2024", generatedAt: "2024-02-25", type: "Performance" },
];

function Reports() {
  const [reports, setReports] = useState(dummyReports);

  // Handle downloading a report (this could trigger a file download)
  const handleDownloadReport = (id) => {
    alert(`Downloading report with ID: ${id}`);
  };

  // Handle viewing a report (could show report details or charts)
  const handleViewReport = (id) => {
    const report = reports.find((report) => report.id === id);
    alert(`Viewing Report: ${report.title}\nType: ${report.type}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>View Reports</h2>

      {/* List of reports */}
      <div style={styles.reportsList}>
        {reports.map((report) => (
          <div key={report.id} style={styles.reportCard}>
            <h4>{report.title}</h4>
            <p>Generated At: {report.generatedAt}</p>
            <p>Type: {report.type}</p>
            <div style={styles.actions}>
              <button onClick={() => handleViewReport(report.id)} style={styles.viewButton}>
                <FaChartLine /> View
              </button>
              <button onClick={() => handleDownloadReport(report.id)} style={styles.downloadButton}>
                <FaFileDownload /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
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
  reportsList: {
    marginTop: "20px",
  },
  reportCard: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  actions: {
    marginTop: "10px",
  },
  viewButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "10px",
  },
  downloadButton: {
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Reports;
