import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Box from "@mui/material/Box";

const Layout = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #eafff2 0%, #f6fff8 100%)",
    }}
  >
    <Sidebar />
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Header />
      <Box
        sx={{
          flex: 1,
          p: 4,
          display: "flex",
          justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  </Box>
);

export default Layout;
