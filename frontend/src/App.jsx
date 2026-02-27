import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Stories from "./pages/Stories";
import StoryReader from "./pages/StoryReader";
import CreateStory from "./pages/CreateStory";
import EditStory from "./pages/EditStory";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/stories/:id"
  element={
    <ProtectedRoute>
      <StoryReader />
    </ProtectedRoute>
  }
/>
<Route path="/stories" element={<Stories />} />

<Route
  path="/create"
  element={
    <ProtectedRoute>
      <CreateStory />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit/:id"
  element={
    <ProtectedRoute>
      <EditStory />
    </ProtectedRoute>
  }
/>



      </Routes>

       
      <Footer />
    </BrowserRouter>
  );
}

export default App;
