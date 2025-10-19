// src/context/AuthContext.jsx

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3001/api";

// 1. Criar o "molde" do nosso quadro de avisos
const AuthContext = createContext();

// 2. Criar o "Provedor" - o componente que vai fornecer a informação
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate(); // Ferramenta para navegar entre páginas

  // Efeito para configurar o axios sempre que o token mudar
  useEffect(() => {
    if (token) {
      // Guardar o token para que ele não se perca se o utilizador recarregar a página
      localStorage.setItem("authToken", token);
      // Dizer ao axios para usar este token em TODOS os pedidos futuros
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      // Se não houver token, remover dos locais de armazenamento
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Função de Login: será chamada pela LoginPage
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      setToken(response.data.token); // Guardar o novo token no nosso estado
      navigate("/"); // Navegar para a página de tarefas após o login
    } catch (error) {
      console.error("Falha no login:", error);
      alert("Email ou senha inválidos.");
    }
  };

  // Função de Logout
  const logout = () => {
    setToken(null); // Limpar o token do nosso estado
    navigate("/login"); // Navegar para a página de login
  };

  // Juntar todas as informações que queremos partilhar
  const value = {
    token,
    login,
    logout,
  };

  // 5. O Provedor partilha o "value" com todos os seus "filhos"
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 6. Criar um "atalho" (custom hook) para usar o nosso contexto facilmente
export function useAuth() {
  return useContext(AuthContext);
}
