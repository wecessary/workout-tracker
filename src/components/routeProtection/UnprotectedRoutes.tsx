import { User } from "firebase/auth";
import { ReactElement, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const getUnprotectedRoutes = (
  user: User | null | undefined,
  loading: boolean,
  redirectedRoute: ReactElement | null,
  unprotectedRoute: ReactElement | null
) => {
  const isLoading = loading ? null : unprotectedRoute;
  return user ? redirectedRoute : isLoading;
};

const UnprotectedRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  return getUnprotectedRoutes(
    user,
    loading,
    <Navigate to="/tracker" />,
    <Outlet />
  );
};

export default UnprotectedRoutes;
