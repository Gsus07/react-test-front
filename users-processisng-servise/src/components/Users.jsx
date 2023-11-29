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

const defaultObj = [
    {
      id: 1001,
      name: 'pancracio',
      email: 'test123@gmail.com',
      phone: 3034599860,
      salary: 2223990,
      age: 34,
      occupation: 'secretario', // Nueva propiedad
    },
  ];
  
  const Users = () => {
    const [users, setUsers] = useState(defaultObj);
    const [newUser, setNewUser] = useState({
      id: '',
      name: '',
      email: '',
      phone: '',
      salary: '',
      age: '',
      occupation: '', // Nueva propiedad
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
  
    const addUser = () => {
      if (editingIndex === -1) {
        setUsers((prevUsers) => [...prevUsers, newUser]);
      } else {
        const updatedUsers = [...users];
        updatedUsers[editingIndex] = newUser;
        setUsers(updatedUsers);
        setEditingIndex(-1);
      }
  
      setNewUser({
        id: '',
        name: '',
        email: '',
        phone: '',
        salary: '',
        age: '',
        occupation: '', // Restablecer la propiedad occupation
      });
    };
  

  const editUser = (index) => {
    setEditingIndex(index);
    setNewUser(users[index]);
  };

  const removeEntry = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const filterUsers = () => {
    if (!searchTerm) {
      return users;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerCaseSearch) ||
        user.id.toString().includes(lowerCaseSearch)
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const actionsColumnWidth = 150;

  return (
    <Component>
      <Typography variant="h4">Users</Typography>
      <TextField
        type="text"
        placeholder="Search by name or ID"
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
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell style={{ width: actionsColumnWidth }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '#FFFFFF' }}>
            <TableRow>
            <TableCell>
                <input
                  type="text"
                  name="id"
                  value={newUser.id}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="salary"
                  value={newUser.salary}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  name="age"
                  value={newUser.age}
                  onChange={handleInputChange}
                />
              </TableCell>
              <TableCell>
                <select
                  name="occupation"
                  value={newUser.occupation}
                  onChange={handleInputChange}
                >
                  <option value="secretario">Secretario</option>
                  <option value="ingeniero">Ingeniero</option>
                  <option value="gerente">Gerente</option>
                </select>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="success" onClick={addUser}>
                  {editingIndex === -1 ? 'Add User' : 'Save'}
                </Button>
              </TableCell>
            </TableRow>
            {(rowsPerPage > 0
              ? filterUsers().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filterUsers()
            ).map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.salary}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.occupation}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editUser(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeEntry(user.id)}
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
          count={filterUsers().length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Component>
  );
};

export default Users;
