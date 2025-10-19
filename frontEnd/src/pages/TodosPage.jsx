// src/pages/TodosPage.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
// Importar os componentes e ícones do MUI
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

const API_BASE_URL = "http://localhost:3001/api";

function TodosPage() {
  const { token, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (token) {
      const buscarTarefas = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/todos`);
          setTodos(response.data);
        } catch (error) {
          if (error.response && error.response.status === 403) {
            logout();
          }
        }
      };
      buscarTarefas();
    }
  }, [token, logout]);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    if (inputText.trim() === "") return;
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, {
        title: inputText,
      });
      setTodos([...todos, response.data]);
      setInputText("");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  };

  const handleToggleComplete = async (tarefaParaAtualizar) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/todos/${tarefaParaAtualizar.id}`,
        {
          title: tarefaParaAtualizar.title,
          completed: !tarefaParaAtualizar.completed,
        }
      );
      setTodos(
        todos.map((t) => (t.id === tarefaParaAtualizar.id ? response.data : t))
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${id}`, {
        title: editText,
      });
      setTodos(todos.map((t) => (t.id === id ? response.data : t)));
      setEditingId(null);
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem a certeza?")) {
      try {
        await axios.delete(`${API_BASE_URL}/todos/${id}`);
        setTodos(todos.filter((t) => t.id !== id));
      } catch (error) {
        console.error("Erro ao apagar tarefa:", error);
      }
    }
  };

  const handleStartEdit = (tarefa) => {
    setEditingId(tarefa.id);
    setEditText(tarefa.title);
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ minWidth: "100%", boxShadow: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h4">
                Minha Lista de Tarefas
              </Typography>
              <Button variant="outlined" onClick={logout}>
                Logout
              </Button>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", mt: 3 }}
            >
              <TextField
                fullWidth
                variant="outlined"
                label="Adicionar nova tarefa..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ ml: 2, p: "15px" }}
              >
                Adicionar
              </Button>
            </Box>

            <List sx={{ mt: 2 }}>
              {todos.map((tarefa) => (
                <ListItem key={tarefa.id} divider>
                  {editingId === tarefa.id ? (
                    <>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <Button
                        onClick={() => handleSaveEdit(tarefa.id)}
                        sx={{ ml: 1 }}
                      >
                        Salvar
                      </Button>
                      <Button onClick={() => setEditingId(null)}>
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Checkbox
                        edge="start"
                        checked={tarefa.completed}
                        onChange={() => handleToggleComplete(tarefa)}
                      />
                      <ListItemText
                        primary={tarefa.title}
                        sx={{
                          textDecoration: tarefa.completed
                            ? "line-through"
                            : "none",
                          color: tarefa.completed
                            ? "text.secondary"
                            : "text.primary",
                        }}
                      />
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleStartEdit(tarefa)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(tarefa.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default TodosPage;
