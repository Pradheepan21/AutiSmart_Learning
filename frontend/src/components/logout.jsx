import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session (local storage or context)
    localStorage.removeItem("user");

    // Redirect to the SignIn page after logout
    navigate("/signin");
  }, [navigate]);

  return <p>Logging out...</p>; // Optionally, show a "logging out" message
}
