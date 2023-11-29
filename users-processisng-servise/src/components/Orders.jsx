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
  TextareaAutosize,
} from '@mui/material';

const Component = styled(Box)`
  width: 80%;
  margin: 20px auto;
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
    trackingNumber: 'TN-20231129-1234', // Ejemplo de número de guía
  },
];

const generateTrackingNumber = () => {
  const currentDate = new Date();
  const uniqueId = Math.floor(Math.random() * 10000);
  return `TN-${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}-${uniqueId}`;
};

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
    comments: '',
    products: [],
    trackingNumber: generateTrackingNumber(),
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
      const newOrderWithTracking = {
        ...newOrder,
        trackingNumber: generateTrackingNumber(),
      };
      setOrders((prevOrders) => [...prevOrders, newOrderWithTracking]);
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
      comments: '',
      products: [],
      trackingNumber: generateTrackingNumber(),
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

  const generateReceipt = (order) => {
    console.log("Generating receipt for order:", order);
    // Puedes implementar lógica adicional para crear y mostrar el comprobante
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

  const actionsColumnWidth = 200;

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
              <TableCell>Comments</TableCell>
              <TableCell>Tracking Number</TableCell>
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
              <TableCell>{newOrder.trackingNumber}</TableCell>
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
                <TableCell>{index === editingIndex ? newOrder.id : order.id}</TableCell>
                <TableCell>{index === editingIndex ? newOrder.customerName : order.customerName}</TableCell>
                <TableCell>{index === editingIndex ? newOrder.email : order.email}</TableCell>
                <TableCell>{index === editingIndex ? newOrder.phone : order.phone}</TableCell>
                <TableCell>{index === editingIndex ? newOrder.totalCost : order.totalCost}</TableCell>
                <TableCell>{index === editingIndex ? newOrder.shippingAddress : order.shippingAddress}</TableCell>
                <TableCell>{index === editingIndex ? newOrder.status : order.status}</TableCell>
                <TableCell>{index === editingIndex ? newOrder.comments : order.comments}</TableCell>
                <TableCell>{index === editingIndex ? newOrder.trackingNumber : order.trackingNumber}</TableCell>
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
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => generateReceipt(order)}
                  >
                    Generate Receipt
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
