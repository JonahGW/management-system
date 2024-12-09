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






/*import React, { useState, useEffect } from 'react';
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
import { db } from '../config/firebase'; // Import Firebase configuration
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
        const productsCollection = collection(db, 'products');
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
      const productsCollection = collection(db, 'products');
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
      const productDocRef = doc(db, 'products', id);
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
        <Button variant="contained" style={{ backgroundColor: '#2196F3', color: 'white' }} onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" style={{ backgroundColor: '#2196F3', color: 'white' }}>
          Search
        </Button>
      </Box>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Box component="form" style={{ marginBottom: '20px' }}>
        <TextField
          label="Product Name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Price(Ksh)"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Weight (kg)"
          name="weight"
          value={newProduct.weight}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Code"
          name="code"
          value={newProduct.code}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Type"
          name="type"
          value={newProduct.type}
          onChange={handleInputChange}
          style={{ marginTop: '10px' }}
        />
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

/*import React, { useState, useEffect } from 'react';
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
import { db } from '../config/firebase'; // Import Firebase configuration
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
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch products from Firestore
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
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
      const productsCollection = collection(db, 'products');
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
      const productDocRef = doc(db, 'products', id);
      await deleteDoc(productDocRef);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Manage Products</h2>
        <Button variant="contained" style={{ backgroundColor: '#2196F3', color: 'white' }} onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Box component="form" style={{ marginBottom: '20px' }}>
        <TextField
          label="Product Name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Price(Ksh)"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Weight (kg)"
          name="weight"
          value={newProduct.weight}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Code"
          name="code"
          value={newProduct.code}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Type"
          name="type"
          value={newProduct.type}
          onChange={handleInputChange}
          style={{ marginTop: '10px' }}
        />
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
            {products.map((product) => (
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

export default ManageProducts;*/

/*import React, { useState } from 'react';
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

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    weight: '',
    code: '',
    type: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Validate if all fields are filled
    if (!newProduct.name || !newProduct.price || !newProduct.weight || !newProduct.code || !newProduct.type) {
      setError('Please fill out all fields.');
      return;
    }

    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const productToAdd = { ...newProduct, id: newId };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: '', price: '', weight: '', code: '', type: '' });
    setError(''); // Clear error message
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Manage Products</h2>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Box component="form" style={{ marginBottom: '20px' }}>
        <TextField
          label="Product Name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Price(Ksh)"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Weight (kg)"
          name="weight"
          value={newProduct.weight}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Code"
          name="code"
          value={newProduct.code}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Type"
          name="type"
          value={newProduct.type}
          onChange={handleInputChange}
          style={{ marginTop: '10px' }}
        />
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
            {products.map((product) => (
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

/*import React, { useState } from 'react';
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

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    weight: '',
    code: '',
    type: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const productToAdd = { ...newProduct, id: newId };
    setProducts([...products, productToAdd]);
    setNewProduct({ name: '', price: '', weight: '', code: '', type: '' });
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <h2 style={{ margin: 0, color: '#2c3e50' }}>Manage Products</h2>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>
      <Box component="form" style={{ marginBottom: '20px' }}>
        <TextField
          label="Product Name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Price(Ksh)"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Weight (kg)"
          name="weight"
          value={newProduct.weight}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Code"
          name="code"
          value={newProduct.code}
          onChange={handleInputChange}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Product Type"
          name="type"
          value={newProduct.type}
          onChange={handleInputChange}
          style={{ marginTop: '10px' }}
        />
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
            {products.map((product) => (
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

/*import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        weight: '',
        code: '',
        type: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newId = products.length ? products[products.length - 1].id + 1 : 1;
        const productToAdd = { ...newProduct, id: newId };
        setProducts([...products, productToAdd]);
        setNewProduct({ name: '', price: '', weight: '', code: '', type: '' });
    };

    const handleDeleteProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Manage Products</h2>
            <form onSubmit={handleAddProduct} style={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                />
                <input
                    type="number"
                    name="weight"
                    placeholder="Product Weight (kg)"
                    value={newProduct.weight}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="code"
                    placeholder="Product Code"
                    value={newProduct.code}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Product Type"
                    value={newProduct.type}
                    onChange={handleInputChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.addButton}>Add Product</button>
            </form>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Weight</th>
                        <th style={styles.th}>Code</th>
                        <th style={styles.th}>Type</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} style={styles.tr}>
                            <td style={styles.td}>{product.name}</td>
                            <td style={styles.td}>{product.price}</td>
                            <td style={styles.td}>{product.weight}</td>
                            <td style={styles.td}>{product.code}</td>
                            <td style={styles.td}>{product.type}</td>
                            <td style={styles.td}>
                                <button onClick={() => handleDeleteProduct(product.id)} style={styles.deleteButton}>
                                    <FaTrashAlt /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '20px 0',
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2',
    },
    tr: {
        borderBottom: '1px solid #ddd',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
};

export default ManageProducts;*/
