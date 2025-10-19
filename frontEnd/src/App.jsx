import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (evento) => {
    evento.preventDefault();
    if (inputText.trim() === "") {
      alert("Por favor, escreva o título da tarefa.");
      return;
    }
    const novaTarefa = {
      id: Date.now(),
      title: inputText,
      completed: false,
    };
    setTodos([...todos, novaTarefa]);
    setInputText("");
  };

  return (
    <div>
      <h1>Minha Lista de Tarefas</h1>

      {/* Ligamos a nossa função handleSubmit ao evento onSubmit do formulário */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar nova tarefa..."
          value={inputText}
          onChange={(evento) => setInputText(evento.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {/* Área para mostrar a nossa lista de tarefas */}
      <ul>
        {todos.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
