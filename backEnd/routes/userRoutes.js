// 1. Importar as ferramentas necessárias
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

// Rota para Login de Utilizador
router.post("/login", async (req, res) => {
  // 1. Pegar as credenciais enviadas pelo cliente
  const { email, password } = req.body;

  // 2. Verificar se os campos foram enviados
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Por favor, forneça email e senha." });
  }

  try {
    // 3. VERIFICAÇÃO 1: O utilizador existe?
    // Procurar na "lista de funcionários" (tabela User) por um utilizador com este email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Se não encontrou ninguém (user é null), barra a entrada
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // 4. VERIFICAÇÃO 2: A senha está correta?
    // Compara a senha que o utilizador enviou (password) com a "impressão digital" da senha que está na despensa (user.password)
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Se as "impressões digitais" não baterem, barra a entrada
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // 5. Se passou nas duas verificações, criar o "crachá de acesso" (Token JWT)
    const token = jwt.sign(
      { userId: user.id }, // A informação que guardamos dentro do crachá
      process.env.JWT_SECRET, // A nossa "chave secreta mestre" para assinar o crachá
      { expiresIn: "1h" } // O prazo de validade do crachá (1 hora)
    );

    // 6. Enviar o crachá de volta para o cliente
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login." });
  }
});

module.exports = router;
// 10. Exportar o nosso "gerente de departamento" para que o "Chef Principal" o conheça
module.exports = router;
