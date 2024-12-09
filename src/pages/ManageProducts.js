import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { FaTrashAlt } from 'react-icons/fa';
import { db, auth } from '../config/firebase'; // Import Firebase configuration
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    weight: '',
    code: '',
    type: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch products from Firestore
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "users", auth.currentUser.uid, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // Validate if all fields are filled
    if (!newProduct.name || !newProduct.price || !newProduct.weight || !newProduct.code || !newProduct.type) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const productsCollection = collection(db, "users", auth.currentUser.uid, "products");
      const docRef = await addDoc(productsCollection, newProduct);
      setProducts([...products, { ...newProduct, id: docRef.id }]);
      setNewProduct({ name: '', price: '', weight: '', code: '', type: '' });
      setError(''); // Clear error message
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const productDocRef = doc(db, "users", auth.currentUser.uid, "products", id);
      await deleteDoc(productDocRef);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Manage Products</h2>
      </Box>
      <Box display="flex" alignItems="center" marginBottom="20px">
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginRight: '10px', flex: 1 }}
        />
        <Button variant="contained" style={{ backgroundColor: '#2196F3', color: 'white' }}>
          Search
        </Button>
      </Box>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Box component="form" display="flex" flexWrap="wrap" gap="10px" alignItems="center" onSubmit={handleAddProduct} style={{ marginBottom: '20px' }}>
        <TextField
          label="Product Name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Product Price(Ksh)"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <TextField
          label="Product Weight (kg)"
          name="weight"
          value={newProduct.weight}
          onChange={handleInputChange}
        />
        <TextField
          label="Product Code"
          name="code"
          value={newProduct.code}
          onChange={handleInputChange}
        />
        <TextField
          label="Product Type"
          name="type"
          value={newProduct.type}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" style={{ backgroundColor: '#2196F3', color: 'white' }}>
          Add Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Weight</strong></TableCell>
              <TableCell><strong>Code</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.weight}</TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteProduct(product.id)}
                    variant="contained"
                    color="error"
                    size="small"
                    style={{ marginLeft: '5px' }}
                  >
                    <FaTrashAlt /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageProducts;
