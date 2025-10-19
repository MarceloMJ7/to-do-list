// src/pages/RegisterPage.jsx

import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Importar os "móveis" do MUI
import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const API_BASE_URL = "http://localhost:3001/api";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/register`, { name, email, password });
      alert("Conta criada com sucesso! Por favor, faça o login.");
      navigate("/login");
    } catch (err) {
      setError("Não foi possível criar a conta. O email já pode estar em uso.");
    }
  };

  return (
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
          Criar Conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome Completo"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registar
          </Button>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Já tem uma conta? Faça o login.
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
