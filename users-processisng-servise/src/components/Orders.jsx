import React, { useState } from 'react';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  styled,
  Button,
  Table,
  TextField,
  TablePagination,
  TextareaAutosize, // Añadido para el campo de comentarios
} from '@mui/material';

const Component = styled(Box)`
  width: 80%;
  margin: 50px auto;
  & > h4 {
    margin-bottom: 20px;
    text-align: center; 
  }
  & > div > table > thead {
    background-color: #070099;
  }
  & > div > table > thead > tr > th {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
  & > div > table > tbody > tr > td {
    font-size: 16px;
  }
`;

const defaultOrders = [
  {
    id: 1001,
    customerName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-1234',
    totalCost: 99.99,
    shippingAddress: '123 Main St',
    status: 'Pending',
    comments: 'Great customer!',
    products: [
      { id: 1, name: 'Product 1', quantity: 2, price: 49.99 },
      // ... más productos
    ],
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(defaultOrders);
  const [newOrder, setNewOrder] = useState({
    id: '',
    customerName: '',
    email: '',
    phone: '',
    totalCost: '',
    shippingAddress: '',
    status: 'Pending',
    comments: '', // Nuevo campo de comentarios
    products: [],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [paddress, setPaddress] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const addOrder = () => {
    if (editingIndex === -1) {
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    } else {
      const updatedOrders = [...orders];
      updatedOrders[editingIndex] = newOrder;
      setOrders(updatedOrders);
      setEditingIndex(-1);
    }

    setNewOrder({
      id: '',
      customerName: '',
      email: '',
      phone: '',
      totalCost: '',
      shippingAddress: '',
      status: 'Pending',
      comments: '', // Restablecer los comentarios a un valor predeterminado
      products: [],
    });
  };

  const editOrder = (index) => {
    setEditingIndex(index);
    setNewOrder(orders[index]);
  };

  const removeOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  const filterOrders = () => {
    if (!searchTerm) {
      return orders;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    return orders.filter(
      (order) =>
        order.customerName.toLowerCase().includes(lowerCaseSearch) ||
        order.id.toString().includes(lowerCaseSearch)
    );
  };

  const handleChangePaddress = (event, newPaddress) => {
    setPaddress(newPaddress);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPaddress(0);
  };

  const actionsColumnWidth = 150;

  return (
    <Component>
      <Typography variant="h4">Online Orders</Typography>
      <TextField
        type="text"
        placeholder="Search by customer name or ID"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', backgroundColor: '#E1F4F6' }}
        className="searchInput"
      />
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Total Cost</TableCell>
              <TableCell>Shipping Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Comments</TableCell> {/* Nuevo encabezado de columna para comentarios */}
              <TableCell style={{ width: actionsColumnWidth }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '#FFFFFF' }}>
            <TableRow>
              <TableCell>
                <input
                  type="text"
                  name="id"
                  value={newOrder.id}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="customerName"
                  value={newOrder.customerName}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="email"
                  value={newOrder.email}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="phone"
                  value={newOrder.phone}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="totalCost"
                  value={newOrder.totalCost}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="shippingAddress"
                  value={newOrder.shippingAddress}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <select
                  name="status"
                  value={newOrder.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </TableCell>
              <TableCell>
                <TextareaAutosize
                  minRows={3}
                  placeholder="Comments"
                  name="comments"
                  value={newOrder.comments}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <Button variant="contained" color="success" onClick={addOrder}>
                  {editingIndex === -1 ? 'Add Order' : 'Save'}
                </Button>
              </TableCell>
            </TableRow>
            {(rowsPerPage > 0
              ? filterOrders().slice(paddress * rowsPerPage, paddress * rowsPerPage + rowsPerPage)
              : filterOrders()
            ).map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.totalCost}</TableCell>
                <TableCell>{order.shippingAddress}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.comments}</TableCell> {/* Mostrar comentarios en la tabla */}
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editOrder(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeOrder(order.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[15, 25, 50, 100]}
          component="div"
          count={filterOrders().length}
          rowsPerPage={rowsPerPage}
          page={paddress}
          onChangePage={handleChangePaddress}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Component>
  );
};

export default Orders;
