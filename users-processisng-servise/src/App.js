// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import OrderForm from './components/OrderForm';
import Orders from './components/Orders';   // Cambiado de Order a Orders

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>   // Cambiado de Switch a Routes
        <Route path="/order-form" element={<OrderForm />} />
        <Route path="/orders" element={<Orders />} />
        {/* Otras rutas si es necesario */}
      </Routes>
    </Router>
  );
};

export default App;
