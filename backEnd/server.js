// 1. Importar as "ferramentas" que vamos usar
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

// 2. Criar o nosso "Chef" (a aplicação Express)
const app = express();

// 3. Definir a "porta" onde o nosso restaurante vai funcionar
const PORT = process.env.PORT || 3001;

// 4. Ensinar o nosso "Chef" a usar as ferramentas (os Middlewares)
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

// 5. Criar um "balcão de teste" para ver se a cozinha está aberta
app.get("/", (req, res) => {
  res.send("A API da nossa lista de tarefas está no ar!");
});

// 6. Mandar o "Chef" abrir o restaurante e começar a ouvir os pedidos
app.listen(PORT, () => {
  console.log(`Servidor a funcionar na porta ${PORT}`);
});
