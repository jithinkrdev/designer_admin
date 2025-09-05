import React, { useState } from "react";
import api from "../api/config";
import { useUsers } from "../hooks/useUsers";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import EditUserModal from "../components/EditUserModal";
import CreateUserModal from "../components/CreateUserModal";
import { Edit, Delete } from "@mui/icons-material";

const Users = () => {
  const {
    users,
    loading,
    error,
    setUsers,
    fetchUsers,
    createUser,
    editUser: editUserApi,
    deleteUser: deleteUserApi,
  } = useUsers();
  const [editUser, setEditUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    brandName: "",
    phoneNumber: "",
    isActive: true,
    role: "",
    address: "",
  });

  const handleEdit = (user) => {
    setEditUser(user);
    setOpenEdit(true);
  };

  const handleDelete = (id) => {
    deleteUserApi(id);
  };

  const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    await editUserApi(editUser);
    setOpenEdit(false);
    setEditUser(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700} color="primary">
          Users
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreate(true)}
        >
          Create
        </Button>
      </Box>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Available Quota</TableCell>
              <TableCell>Subscription Start</TableCell>
              <TableCell>Subscription End</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.quota}</TableCell>
                  <TableCell>{user.subStart}</TableCell>
                  <TableCell>{user.subEnd}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => handleEdit(user)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(user.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <EditUserModal
        open={openEdit}
        user={editUser}
        onChange={handleEditChange}
        onClose={() => setOpenEdit(false)}
        onSave={handleEditSave}
      />
      <CreateUserModal
        open={openCreate}
        user={newUser}
        onChange={(e) => {
          const { name, value } = e.target;
          setNewUser((prev) => ({
            ...prev,
            [name]: name === "isActive" ? value === "true" : value,
          }));
        }}
        onClose={() => setOpenCreate(false)}
        onCreate={async () => {
          await createUser(newUser);
          setOpenCreate(false);
        }}
      />
    </Box>
  );
};

export default Users;
