import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const ReadOnlyRow = ({ user, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{user.fullName}</td>
      <td>{user.address}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.email}</td>
      <td>
        <IconButton
          type="button"
          onClick={(event) => handleEditClick(event, user)}
        >
          <Tooltip title="cancel">
            <ModeEditIcon />
          </Tooltip>
        </IconButton>
        <IconButton type="button" onClick={() => handleDeleteClick(user.id)}>
          <Tooltip title="cancel">
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
