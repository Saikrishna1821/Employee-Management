import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/ui/app-sidebar";
import { ThemeProvider } from "./components/ui/Themeprovider";
function App({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />

          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <Employees />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
          {children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
