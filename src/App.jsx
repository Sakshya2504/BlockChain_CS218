import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

//  Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Verifier from "./pages/Verifier";

function App() {
  return (
    //  Router wraps entire app
    <BrowserRouter>

      {/*  Navbar visible on all pages */}
      <Navbar />

      {/*  Main Content Area */}
      <div className="pt-2">
        <Routes>

          {/*  Home Page */}
          <Route path="/" element={<Home />} />

          {/*  Register Identity */}
          <Route path="/register" element={<Register />} />

          {/*  User Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/*  Verifier/Admin Panel */}
          <Route path="/verifier" element={<Verifier />} />

          {/*  Fallback Route (if page not found) */}
          <Route
            path="*"
            element={
              <div className="text-white text-center mt-20">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;