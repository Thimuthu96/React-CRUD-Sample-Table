import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const EditableRow = ({ editForm, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required
          placeholder="Enter name"
          name="fullName"
          value={editForm.fullName}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Enter address"
          name="address"
          value={editForm.address}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Enter phone number"
          name="phoneNumber"
          value={editForm.phoneNumber}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          type="email"
          required
          placeholder="Enter email"
          name="email"
          value={editForm.email}
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <IconButton type="submit">
          <Tooltip title="save">
            <SaveIcon />
          </Tooltip>
        </IconButton>
        <IconButton type="button" onClick={handleCancelClick}>
          <Tooltip title="cancel">
            <CancelOutlinedIcon />
          </Tooltip>
        </IconButton>
      </td>
    </tr>
  );
};

export default EditableRow;
