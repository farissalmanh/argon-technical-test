import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { validateToken } from "../services/authentication.service";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  const checkUserToken = async () => {
    const token = localStorage.getItem("token");
    const data = await validateToken(token);
    setAuthenticated(data.status);
    if (!data.status) return navigate("/login");
    localStorage.setItem("employeeDetail", JSON.stringify(data.payload));
  };

  useEffect(() => {
    checkUserToken();
  }, []);

  return <>{authenticated ? props.children : null}</>;
};

export default ProtectedRoute;
