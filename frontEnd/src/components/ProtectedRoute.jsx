// src/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { token } = useAuth(); // Olhar para o "quadro de avisos" para ver se temos um token

  if (!token) {
    // Se NÃO houver token, redirecionar o utilizador para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se houver token, simplesmente mostrar a página que está a ser protegida
  return children;
}

export default ProtectedRoute;
