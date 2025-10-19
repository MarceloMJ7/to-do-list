// src/App.jsx (ATUALIZADO)

import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; // 1. Importar o nosso segurança
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TodosPage from "./pages/TodosPage";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 2. A nossa rota principal agora está a ser vigiada */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TodosPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
