import React, { useState } from "react";  
import { FaEye, FaTrashAlt } from "react-icons/fa"; // Icons for viewing and deleting records  

// Dummy records data  
const dummyRecords = [  
  { id: 1, title: "Record 1", description: "Description for record 1", date: "2024-01-01" },  
  { id: 2, title: "Record 2", description: "Description for record 2", date: "2024-01-02" },  
  { id: 3, title: "Record 3", description: "Description for record 3", date: "2024-01-03" },  
];  

function DisplayRecords() {  
  const [records, setRecords] = useState(dummyRecords);  
  const [selectedRecord, setSelectedRecord] = useState(null); // State to manage the selected record  
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility  
  const [newRecord, setNewRecord] = useState({ title: "", description: "", date: "" }); // State for new record form  

  // Handle deleting a record  
  const handleDeleteRecord = (id) => {  
    const updatedRecords = records.filter((record) => record.id !== id);  
    setRecords(updatedRecords);  
  };  

  // Handle viewing a record  
  const handleViewRecord = (id) => {  
    const recordToView = records.find((record) => record.id === id);  
    setSelectedRecord(recordToView); // Set the selected record to display  
    setIsModalOpen(true); // Open the modal  
  };  

  // Function to close the modal  
  const closeModal = () => {  
    setIsModalOpen(false);  
    setSelectedRecord(null); // Clear the selected record  
  };  

  // Handle form input changes  
  const handleInputChange = (e) => {  
    const { name, value } = e.target;  
    setNewRecord({ ...newRecord, [name]: value });  
  };  

  // Handle adding a new record  
  const handleAddRecord = (e) => {  
    e.preventDefault();  
    const newId = records.length ? records[records.length - 1].id + 1 : 1; // Generate a new ID  
    const recordToAdd = { ...newRecord, id: newId };  
    setRecords([...records, recordToAdd]);  
    setNewRecord({ title: "", description: "", date: "" }); // Reset form  
  };  

  return (  
    <div style={styles.container}>  
      <h2 style={styles.title}>Display Records</h2>  

      {/* Form for adding a new record */}  
      <form onSubmit={handleAddRecord} style={styles.form}>  
        <input  
          type="text"  
          name="title"  
          placeholder="Record Title"  
          value={newRecord.title}  
          onChange={handleInputChange}  
          required  
          style={styles.input}  
        />  
        <textarea  
          name="description"  
          placeholder="Record Description"  
          value={newRecord.description}  
          onChange={handleInputChange}  
          required  
          style={styles.textarea}  
        />  
        <input  
          type="date"  
          name="date"  
          value={newRecord.date}  
          onChange={handleInputChange}  
          required  
          style={styles.input}  
        />  
        <button type="submit" style={styles.addButton}>Add Record</button>  
      </form>  

      {/* Table for displaying records */}  
      <table style={styles.table}>  
        <thead>  
          <tr>  
            <th style={styles.th}>Title</th>  
            <th style={styles.th}>Description</th>  
            <th style={styles.th}>Date</th>  
            <th style={styles.th}>Actions</th>  
          </tr>  
        </thead>  
        <tbody>  
          {records.map((record) => (  
            <tr key={record.id} style={styles.tr}>  
              <td style={styles.td}>{record.title}</td>  
              <td style={styles.td}>{record.description}</td>  
              <td style={styles.td}>{record.date}</td>  
              <td style={styles.td}>  
                <button onClick={() => handleViewRecord(record.id)} style={styles.viewButton}>  
                  <FaEye /> View  
                </button>  
                <button onClick={() => handleDeleteRecord(record.id)} style={styles.deleteButton}>  
                  <FaTrashAlt /> Delete  
                </button>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  

      {/* Modal for displaying record details */}  
      {isModalOpen && selectedRecord && (  
        <div style={styles.modal}>  
          <div style={styles.modalContent}>  
            <span style={styles.closeButton} onClick={closeModal}>&times;</span>  
            <h2>{selectedRecord.title}</h2>  
            <p>{selectedRecord.description}</p>  
            <p><strong>Date:</strong> {selectedRecord.date}</p>  
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
  form: {  
    display: "flex",  
    flexDirection: "column",  
    marginBottom: "20px",  
  },  
  input: {  
    padding: "10px",  
    marginBottom: "10px",  
    border: "1px solid #ddd",  
    borderRadius: "5px",  
    fontSize: "16px",  
  },  
  textarea: {  
    padding: "10px",  
    marginBottom: "10px",  
    border: "1px solid #ddd",  
    borderRadius: "5px",  
    resize: "vertical",  
    fontSize: "16px",  
  },  
  addButton: {  
    backgroundColor: "#4CAF50",  
    color: "white",  
    border: "none",  
    padding: "10px",  
    cursor: "pointer",  
    borderRadius: "5px",  
    fontSize: "16px",  
    transition: "background-color 0.3s",  
  },  
  addButtonHover: {  
    backgroundColor: "#45a049",  
  },  
  table: {  
    width: "100%",  
    borderCollapse: "collapse",  
    margin: "20px 0",  
  },  
  th: {  
    border: "1px solid #ddd",  
    padding: "8px",  
    textAlign: "left",  
    backgroundColor: "#f2f2f2",  
  },  
  tr: {  
    borderBottom: "1px solid #ddd",  
  },  
  td: {  
    border: "1px solid #ddd",  
    padding: "8px",  
  },  
  viewButton: {  
    backgroundColor: "#2196F3",  
    color: "white",  
    border: "none",  
    padding: "5px 10px",  
    cursor: "pointer",  
    borderRadius: "5px",  
    marginRight: "5px",  
  },  
  deleteButton: {  
    backgroundColor: "#f44336",  
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
    width: "100%",  
    height: "100%",  
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
    borderRadius: "5px",  
  },  
  closeButton: {  
    color: "#aaa",  
    float: "right",  
    fontSize: "28px",  
    fontWeight: "bold",  
    cursor: "pointer",  
  },  
};  

export default DisplayRecords;