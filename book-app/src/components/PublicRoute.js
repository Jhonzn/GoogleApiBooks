import { Navigate } from "react-router-dom";

export  default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    // Si ya está logeado, redirige al dashboard o home
    return <Navigate to="/" replace />;
  }

  return children;
}
