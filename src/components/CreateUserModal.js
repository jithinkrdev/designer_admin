import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const CreateUserModal = ({ open, user, onChange, onClose, onCreate }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Create User</DialogTitle>
    <DialogContent>
      <TextField
        margin="dense"
        label="Email"
        name="email"
        value={user.email}
        onChange={onChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Password"
        name="password"
        type="password"
        value={user.password}
        onChange={onChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Brand Name"
        name="brandName"
        value={user.brandName}
        onChange={onChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Phone Number"
        name="phoneNumber"
        value={user.phoneNumber}
        onChange={onChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Role"
        name="role"
        value={user.role}
        onChange={onChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Address"
        name="address"
        value={user.address}
        onChange={onChange}
        fullWidth
      />
      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Is Active</FormLabel>
        <RadioGroup
          row
          name="isActive"
          value={user.isActive ? true : false}
          onChange={(e) =>
            onChange({
              target: { name: "isActive", value: e.target.value },
            })
          }
        >
          <FormControlLabel value={true} control={<Radio />} label="Active" />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label="Inactive"
          />
        </RadioGroup>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
      <Button onClick={onCreate} color="primary" variant="contained">
        Create
      </Button>
    </DialogActions>
  </Dialog>
);

export default CreateUserModal;
