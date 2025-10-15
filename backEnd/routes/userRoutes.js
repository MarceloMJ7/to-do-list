// 1. Importar as ferramentas necessárias
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

// 2. Inicializar as ferramentas
const router = express.Router();
const prisma = new PrismaClient();

// 3. Definir o nosso primeiro "balcão": Rota para Registar um Novo Utilizador
router.post("/register", async (req, res) => {
  // 4. Pegar os "ingredientes" que o cliente enviou
  const { email, password, name } = req.body;

  // 5. Verificar se todos os ingredientes vieram
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Por favor, forneça todos os campos." });
  }

  try {
    // 6. "Embaralhar" a senha para segurança
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7. Usar o Prisma para criar o novo utilizador na "despensa" (banco de dados)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword, // Guardar a senha embaralhada, NUNCA a original
      },
    });

    // 8. Responder ao cliente com sucesso
    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    // 9. Se algo der errado (ex: email já existe), enviar uma mensagem de erro
    console.error(error);
    res.status(500).json({ message: "Erro ao registar utilizador." });
  }
});

// 10. Exportar o nosso "gerente de departamento" para que o "Chef Principal" o conheça
module.exports = router;
