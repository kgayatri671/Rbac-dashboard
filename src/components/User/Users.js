// src/components/User/Users.js
import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import UserForm from './UserForm';  // Import the form component
import { getUsers, deleteUser } from '../../services/userService';  // Import service functions

const Users = () => {
  const [users, setUsers] = useState([]); // Users state
  const [editingUser, setEditingUser] = useState(null); // State for editing a user
  const [openForm, setOpenForm] = useState(false); // State to control form visibility

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers(); // Fetch users from API
    setUsers(fetchedUsers); // Set users to the state
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId); // Delete user
    fetchUsers(); // Refresh the user list
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Set the user for editing
    setOpenForm(true); // Open the form
  };

  const handleAddNew = () => {
    setEditingUser(null); // Clear the editing user state
    setOpenForm(true); // Open the form to add a new user
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Add New User
      </Button>
      
      {openForm && <UserForm user={editingUser} closeForm={() => setOpenForm(false)} fetchUsers={fetchUsers} />}
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(user)}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
