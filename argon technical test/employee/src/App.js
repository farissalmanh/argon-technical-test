import { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/navbar";
import ProtectedRoute from "./utils/protected-route";
import { Absent, History, Profile, Login } from "./pages";

function App() {
  const [showNav, setShowNav] = useState(true);

  return (
    <div className="App">
      {
        showNav && (
        <div>
          <Navbar />
        </div>
        )
      }
      <Suspense fallback={null}>
        <Routes>
          <Route path="/login" element={<Login funcNav={setShowNav}/>} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Profile funcNav={setShowNav}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/absent"
            element={
              <ProtectedRoute>
                <Absent funcNav={setShowNav}/>
              </ProtectedRoute>
            }
          />
          <Route
            path="history"
            element={
              <ProtectedRoute>
                <History funcNav={setShowNav}/>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>404: Page not found.</div>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
