import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Typography,
} from "@mui/material";

const categories = ["Nighty", "Kurtis", "Sari", "Tshirts"];
const genders = ["Male", "Female", "Other"];

const CreateModelModal = ({
  open,
  form,
  onChange,
  onImageChange,
  onClose,
  onSubmit,
  loading,
  error,
  success,
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
    <DialogTitle>Create Model</DialogTitle>
    <DialogContent>
      <form onSubmit={onSubmit}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={form.category}
            label="Category"
            onChange={onChange}
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={form.gender}
            label="Gender"
            onChange={onChange}
            required
          >
            {genders.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ my: 2 }}>
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={onImageChange}
            />
          </Button>
          {form.imagePreview && (
            <Box sx={{ mt: 2 }}>
              <img
                src={form.imagePreview}
                alt="Model Preview"
                style={{ maxWidth: 200, borderRadius: 8 }}
              />
            </Box>
          )}
        </Box>
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success.main" mb={2}>
            {success}
          </Typography>
        )}
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
      <Button
        onClick={onSubmit}
        color="primary"
        variant="contained"
        disabled={loading}
      >
        {loading ? "Saving..." : "Create"}
      </Button>
    </DialogActions>
  </Dialog>
);

export default CreateModelModal;
