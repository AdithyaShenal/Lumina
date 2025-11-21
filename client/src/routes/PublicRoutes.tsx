// PublicRoutes.tsx
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FullPageSpinner from "../pages/FullPageSpinner";

const PublicRoutes = () => {
  const { data: user, isLoading } = useAuth();
  console.log("Public Routes Activated.");
  // Show a loading indicator while the auth status is being determined
  if (isLoading) {
    return <FullPageSpinner />;
  }

  // If the user object exists, redirect them away from the public page
  if (user) {
    return <Navigate to="/" replace />; // Use replace for clean history
  }

  // User is not logged in, render the public pages (e.g., /login)
  return <Outlet />;
};

export default PublicRoutes;
