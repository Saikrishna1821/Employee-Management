import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { queryClient } from "./query/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster  position="top-center" />
      <App />

    </QueryClientProvider>
  </StrictMode>
);
