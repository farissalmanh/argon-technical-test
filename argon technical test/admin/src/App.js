import { Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/navbar";
import ProtectedRoute from "./utils/protected-route";
import { History, EmployeeList, Login } from "./pages";

import { setupNotifications } from './helpers/firebase';
import { toastNotification, sendNativeNotification } from './helpers/notificationHelpers';
import useVisibilityChange from './hook/useVisibilityChange';

function App() {
  const [showNav, setShowNav] = useState(true);

  const isForeground = useVisibilityChange();
  const title = "Info"
  useEffect(() => {
    setupNotifications((message) => {
      if (isForeground) {
        toastNotification({
          title: "Info",
          description: message,
          status: "info",
        });
      } else {
        sendNativeNotification({
          title,
          body: message,
        });
      }
    });
  }, []);

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
                <EmployeeList funcNav={setShowNav}/>
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
