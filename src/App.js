import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Models from "./pages/Models";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

// Dummy Home page
const Home = () => <div>Welcome to noolil admin!</div>;

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/users"
                      element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                          <Users />
                        </React.Suspense>
                      }
                    />
                    <Route
                      path="/modals"
                      element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                          <Models />
                        </React.Suspense>
                      }
                    />
                    {/* Add other protected routes here */}
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
