import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay sesión, redirige a login
    return <Navigate to="/login" replace />;
  }

  // Si hay sesión, permite ver la ruta
  return children;
}
