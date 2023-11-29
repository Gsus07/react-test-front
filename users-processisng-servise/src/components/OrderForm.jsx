import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  styled,
  Select,
  MenuItem,
  TextareaAutosize,
  Grid,
  FormControl,
  InputLabel,
} from '@mui/material';

const FormComponent = styled(Box)`
  width: 70%;
  margin: 50px auto;
  & > h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

const generateTrackingNumber = () => {
  const currentDate = new Date();
  const uniqueId = Math.floor(Math.random() * 10000);
  return `TN-${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}-${uniqueId}`;
};

const OrderForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    customerName: '',
    email: '',
    phone: '',
    totalCost: '',
    shippingAddress: '',
    status: 'Pending',
    comments: '',
    products: [],
    trackingNumber: generateTrackingNumber(), // Generar automáticamente el número de seguimiento
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      id: '',
      customerName: '',
      email: '',
      phone: '',
      totalCost: '',
      shippingAddress: '',
      status: 'Pending',
      comments: '',
      products: [],
      trackingNumber: generateTrackingNumber(), // Generar automáticamente un nuevo número de seguimiento
    });
  };

  return (
    <FormComponent>
      <Typography variant="h4">Order Form</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="text"
              name="id"
              label="ID"
              value={formData.id}
              onChange={handleInputChange}
              required
              sx={{ backgroundColor: '#E1F4F6' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="text"
              name="customerName"
              label="Customer Name"
              value={formData.customerName}
              onChange={handleInputChange}
              required
              sx={{ backgroundColor: '#E1F4F6' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              sx={{ backgroundColor: '#E1F4F6' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="tel"
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              sx={{ backgroundColor: '#E1F4F6' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="text"
              name="totalCost"
              label="Total Cost"
              value={formData.totalCost}
              onChange={handleInputChange}
              required
              sx={{ backgroundColor: '#E1F4F6' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="text"
              name="shippingAddress"
              label="Shipping Address"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              required
              sx={{ backgroundColor: '#E1F4F6' }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                required
                sx={{ backgroundColor: '#E1F4F6' }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="text"
              name="trackingNumber"
              label="Tracking Number"
              value={formData.trackingNumber}
              onChange={handleInputChange}
              required
              sx={{ backgroundColor: '#E1F4F6' }}
              readOnlyinputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={3}
              placeholder="Comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              style={{ width: '100%' }}
              sx={{ backgroundColor: '#E1F4F6' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="success">
              Add Order
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormComponent>
  );
};

export default OrderForm;
