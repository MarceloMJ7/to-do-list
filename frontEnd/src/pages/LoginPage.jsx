// src/pages/LoginPage.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// 1. Importar os "móveis" do MUI
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const { login } = useAuth();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setError(""); // Limpar erros antigos
    if (!email || !password) {
      setError("Por favor, preencha ambos os campos.");
      return;
    }
    try {
      await login(email, password);
    } catch (err) {
      setError("Email ou senha inválidos.");
    }
  };

  return (
    // 2. Usar os componentes do MUI para criar o layout
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Link to="/register" style={{ textDecoration: "none" }}>
            Não tem uma conta? Crie uma aqui.
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
