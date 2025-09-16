import React, { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateModelModal from "../components/CreateModelModal";
import api from "../api/config";

const Models = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    gender: "",
    image: null,
    imagePreview: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [models, setModels] = useState([]);
  const [modelsLoading, setModelsLoading] = useState(false);

  React.useEffect(() => {
    const fetchModels = async () => {
      setModelsLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get("/model", {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        setModels(res.data || []);
      } catch (err) {
        // Optionally handle error
      } finally {
        setModelsLoading(false);
      }
    };
    fetchModels();
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("gender", form.gender);
      if (form.image) formData.append("image", form.image);
      await api.post("/model", formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Model saved successfully!");
      setForm({
        name: "",
        category: "",
        gender: "",
        image: null,
        imagePreview: null,
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save model");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this model?")) return;
    try {
      const token = localStorage.getItem("access_token");
      await api.delete(`/model/${id}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setModels((prev) => prev.filter((model) => model.id !== id));
    } catch (err) {
      alert("Failed to delete model");
    }
  };

  return (
    <Box sx={{ width: "100%", minHeight: "60vh", position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Create Model
        </Button>
      </Box>
      <CreateModelModal
        open={open}
        form={form}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        success={success}
        maxWidth="md"
      />
      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {modelsLoading ? (
          <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            Loading models...
          </Box>
        ) : models.length === 0 ? (
          <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            No models found.
          </Box>
        ) : (
          models.map((model) => (
            <Box
              key={model.id}
              sx={{
                width: 300,
                p: 2,
                boxShadow: 2,
                borderRadius: 2,
                bgcolor: "background.paper",
                position: "relative",
              }}
            >
              <IconButton
                aria-label="delete"
                size="small"
                sx={{ position: "absolute", top: 8, right: 8 }}
                onClick={() => handleDelete(model._id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
              {model.imageUrl && (
                <Box sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
                  <img
                    src={model.imageUrl}
                    alt={model.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: 180,
                      borderRadius: 8,
                    }}
                  />
                </Box>
              )}
              <Box sx={{ fontWeight: "bold", fontSize: 18 }}>{model.name}</Box>
              <Box sx={{ color: "text.secondary", fontSize: 14 }}>
                Category: {model.category}
              </Box>
              <Box sx={{ color: "text.secondary", fontSize: 14 }}>
                Gender: {model.gender}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Models;
