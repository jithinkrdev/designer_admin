import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditUserModal = ({ open, user, onChange, onClose, onSave }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit User</DialogTitle>
    <DialogContent>
      <TextField
        margin="dense"
        label="User Name"
        name="username"
        value={user?.username || ""}
        onChange={onChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Available Quota"
        name="quota"
        type="number"
        value={user?.quota || ""}
        onChange={onChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Subscription Start"
        name="subStart"
        type="date"
        value={user?.subStart || ""}
        onChange={onChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        margin="dense"
        label="Subscription End"
        name="subEnd"
        type="date"
        value={user?.subEnd || ""}
        onChange={onChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
      <Button onClick={onSave} color="primary" variant="contained">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default EditUserModal;
