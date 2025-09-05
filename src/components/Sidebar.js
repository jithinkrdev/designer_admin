import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Users", route: "/users" },
  { label: "Models", route: "/modals" },
  { label: "Settings", route: "/settings" },
];

const drawerWidth = 220;

const Sidebar = () => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: "border-box",
        background: "#eafff2",
        borderRight: "none",
        pt: 8,
      },
    }}
  >
    <List>
      {navItems.map(({ label, route }) => (
        <ListItem
          button
          key={label}
          sx={{ mb: 1, borderRadius: 2 }}
          component={Link}
          to={route}
        >
          <ListItemText
            primary={
              <Typography variant="body1" color="primary" fontWeight={500}>
                {label}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default Sidebar;
