// PrivateRoutes.tsx
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FullPageSpinner from "../pages/FullPageSpinner";

const PrivateRoutes = () => {
  const { data: user, isLoading, isError } = useAuth();
  console.log("Private Routes Activated.");
  // Show a loading indicator while the auth status is being determined
  if (isLoading) {
    return <FullPageSpinner />;
  }

  // If there's an error (like a 401) OR the user data is falsy (meaning not logged in)
  if (isError || !user) {
    return <Navigate to="/login" replace />; // Use replace for clean history
  }

  // User is logged in
  return <Outlet />;
};

export default PrivateRoutes;
