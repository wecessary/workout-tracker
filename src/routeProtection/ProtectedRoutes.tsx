import { ReactNode, useContext } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useContext(AuthContext);

  const isLoading = loading ? null : <Navigate to="/" />;

  return user ? <>{children}</> : isLoading;
};

export default ProtectedRoutes;
