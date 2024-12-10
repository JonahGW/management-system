import React, { useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa"; // Icons for viewing and deleting records
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material"; // Material-UI components
import CloseIcon from '@mui/icons-material/Close';

// Dummy records data
const dummyRecords = [
  { id: 1, title: "Product 1", description: "Record for product 1", date: "2024-01-01" },
  { id: 2, title: "Product 2", description: "Record for product 2", date: "2024-01-02" },
  { id: 3, title: "Product 3", description: "Record for product 3", date: "2024-01-03" },
];

function DisplayRecords() {
  const [records, setRecords] = useState(dummyRecords);
  const [selectedRecord, setSelectedRecord] = useState(null); // State to manage the selected record
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [newRecord, setNewRecord] = useState({ title: "", description: "", date: "" }); // State for new record form
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

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

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter records based on search query
  const filteredRecords = records.filter((record) =>
    record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <h2 style={{ margin: 0, color: "#2c3e50" }}>Display Products</h2>
        <form onSubmit={handleAddRecord} style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Product Title"
            type="text"
            name="title"
            placeholder="Product Title"
            value={newRecord.title}
            onChange={handleInputChange}
            required
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Record Description"
            type="text"
            name="description"
            placeholder="Record Description"
            value={newRecord.description}
            onChange={handleInputChange}
            required
            style={{ marginRight: "10px" }}
          />
          <TextField
            type="date"
            name="date"
            value={newRecord.date}
            onChange={handleInputChange}
            required
            style={{ marginRight: "10px" }}
          />
          <Button type="submit" variant="contained" style={{ backgroundColor: '#2196F3', color: 'white' }}>
            Add Record
          </Button>
        </form>
      </Box>

      <Box display="flex" alignItems="center" marginBottom="20px">
        <TextField
          label="Search Records"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', flex: 1 }}
        />
        <Button variant="contained" style={{ backgroundColor: '#2196F3', color: 'white' }}>
          Search
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.title}</TableCell>
                <TableCell>{record.description}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleViewRecord(record.id)}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginRight: "5px" }}
                  >
                    <FaEye /> View
                  </Button>
                  <Button
                    onClick={() => handleDeleteRecord(record.id)}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    <FaTrashAlt /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && selectedRecord && (
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedRecord?.title}
            <IconButton
              aria-label="close"
              onClick={closeModal}
              style={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <p>{selectedRecord?.description}</p>
            <p><strong>Date:</strong> {selectedRecord?.date}</p>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default DisplayRecords;