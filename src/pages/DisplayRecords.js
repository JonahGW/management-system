import React, { useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa"; // Icons for viewing and deleting records

// Dummy records data
const dummyRecords = [
  { id: 1, title: "Record 1", description: "Description for record 1" },
  { id: 2, title: "Record 2", description: "Description for record 2" },
  { id: 3, title: "Record 3", description: "Description for record 3" },
];

function DisplayRecords() {
  const [records, setRecords] = useState(dummyRecords);

  // Handle deleting a record
  const handleDeleteRecord = (id) => {
    const updatedRecords = records.filter((record) => record.id !== id);
    setRecords(updatedRecords);
  };

  // Handle viewing a record (basic example for now)
  const handleViewRecord = (id) => {
    const recordToView = records.find((record) => record.id === id);
    alert(`Viewing record: ${recordToView.title}\n${recordToView.description}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Display Records</h2>

      {/* List of records */}
      <div style={styles.recordsList}>
        {records.map((record) => (
          <div key={record.id} style={styles.recordCard}>
            <h4>{record.title}</h4>
            <p>{record.description}</p>
            <div style={styles.actions}>
              <button onClick={() => handleViewRecord(record.id)} style={styles.viewButton}>
                <FaEye /> View
              </button>
              <button onClick={() => handleDeleteRecord(record.id)} style={styles.deleteButton}>
                <FaTrashAlt /> Delete
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
  recordsList: {
    marginTop: "20px",
  },
  recordCard: {
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
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginRight: "10px",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default DisplayRecords;
