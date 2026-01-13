import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Dashboard, DashboardLayout } from "./pages/Dashboard";
import Employees from "./pages/Employees";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ThemeProvider } from "./components/ui/Themeprovider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes with sidebar */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
