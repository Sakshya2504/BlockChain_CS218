import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind CSS import

// Create root and render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Main App Component */}
    <App />
  </React.StrictMode>
);