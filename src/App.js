import { useState, Fragment } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Table, Form, Button } from "react-bootstrap";
import data from "./data.json";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { click } from "@testing-library/user-event/dist/click";

function App() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [userData, setUserData] = useState(data);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const handleFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const filedValue = event.target.value;

    const newData = { ...formData };
    newData[fieldName] = filedValue;

    setFormData(newData);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      id: nanoid(),
      fullName: formData.fullName,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
    };

    const newUsers = [...userData, newUser];
    setUserData(newUsers);
  };

  //editable
  const [editUser, setEditUser] = useState(null);

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUser(user.id);

    const formValues = {
      fullName: user.fullName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      email: user.email,
    };

    setEditForm(formValues);
  };

  //update
  const [editForm, setEditForm] = useState({
    fullName: formData.fullName,
    address: formData.address,
    phoneNumber: formData.phoneNumber,
    email: formData.email,
  });

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const filedValue = event.target.value;

    const newFormData = { ...editForm };
    newFormData[fieldName] = filedValue;

    setEditForm(newFormData);
  };

  //save updated data

  const handleFormSubmitUpdate = (event) => {
    event.preventDefault();

    const updateUser = {
      id: editUser,
      fullName: editForm.fullName,
      address: editForm.address,
      phoneNumber: editForm.phoneNumber,
      email: editForm.email,
    };

    const newUpdatedUser = [...userData];

    const index = userData.findIndex((user) => user.id === editUser);

    newUpdatedUser[index] = updateUser;
    setUserData(newUpdatedUser);
    setEditUser(null);
  };

  //cancel

  const handleCancelClick = () => {
    setEditUser(null);
  };

  //delete

  const handleDeleteClick = (userId) => {
    const newUsers = [...userData];

    const index = userData.findIndex((user) => user.id === userId);
    newUsers.splice(index, 1);
    setUserData(newUsers);
  };

  return (
    <div>
      <h1 className="text-center">CRUD Table</h1>

      <div className="container table">
        <Button
          className="btn-add-user"
          variant="primary"
          onClick={handleClickOpen}
        >
          Add User
        </Button>
        <form onSubmit={handleFormSubmitUpdate}>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <Fragment>
                  {editUser === user.id ? (
                    <EditableRow
                      editForm={editForm}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      user={user}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </Table>
        </form>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new user</DialogTitle>
          <form onSubmit={handleFormSubmit}>
            <DialogContent>
              <DialogContentText style={{ width: "400px" }}></DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Full Name"
                fullWidth
                variant="standard"
                name="fullName"
                required
                onChange={handleFormChange}
              />
              <TextField
                margin="dense"
                id="name"
                label="Address"
                fullWidth
                variant="standard"
                name="address"
                required
                onChange={handleFormChange}
              />
              <TextField
                margin="dense"
                id="name"
                label="Contact Number"
                fullWidth
                variant="standard"
                name="phoneNumber"
                required
                onChange={handleFormChange}
              />
              <TextField
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                name="email"
                required
                onChange={handleFormChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={handleClose}>
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
