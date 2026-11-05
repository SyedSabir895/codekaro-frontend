import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isLoggedIn } from "../api";

// Sends visitors to the login form and remembers where they were headed
function ProtectedRoute() {
  const location = useLocation();

  if (!isLoggedIn()) {
    return (
      <Navigate
        to="/create-account"
        replace
        state={{ from: location.pathname, mode: "login" }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
