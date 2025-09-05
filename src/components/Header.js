import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#fff",
        color: "primary.main",
        borderBottom: "1px solid #eafff2",
        px: 3,
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", minHeight: 64 }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "primary.main", fontSize: "1.5rem" }}
        >
          noolil admin
        </Typography>
        <IconButton onClick={handleLogout} color="primary" title="Logout">
          <FiLogOut size={28} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
