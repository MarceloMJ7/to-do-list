const express = require("express");
const { PrismaClient } = require("@prisma/client");
const verificarToken = require("../middleware/authMiddleware"); // 1. Importar o nosso "segurança"

const router = express.Router();
const prisma = new PrismaClient();

// Rota para LISTAR as tarefas do utilizador logado
// 2. Colocar o "segurança" na porta desta rota
router.get("/todos", verificarToken, async (req, res) => {
  try {
    // 3. Graças ao segurança, temos acesso ao ID do utilizador aqui!
    const userId = req.user.userId;

    // 4. Buscar na "despensa" apenas as tarefas cujo "dono" (ownerId) é o utilizador logado
    const todos = await prisma.todo.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        createdAt: "desc", // Mostrar as mais recentes primeiro
      },
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar tarefas." });
  }
});
// Rota para CRIAR uma nova tarefa
router.post("/todos", verificarToken, async (req, res) => {
  // 1. Pegar o "ingrediente" principal: o título da tarefa
  const { title } = req.body;

  // 2. Verificar se o ingrediente veio
  if (!title) {
    return res
      .status(400)
      .json({ message: "O título da tarefa é obrigatório." });
  }

  try {
    // 3. Pegar o ID do "dono" da tarefa (o utilizador logado)
    // Esta informação vem do nosso "segurança de corredor" (verificarToken)
    const userId = req.user.userId;

    // 4. Usar o Prisma para criar a nova tarefa na "despensa"
    const newTodo = await prisma.todo.create({
      data: {
        title: title, // O título que o cliente enviou
        ownerId: userId, // Ligar esta tarefa ao utilizador logado
        // Os campos 'completed' e 'createdAt' são preenchidos automaticamente
        // graças às regras @default que definimos no schema.prisma
      },
    });

    // 5. Responder ao cliente com a tarefa que acabou de ser criada
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar a tarefa." });
  }
});

// Rota para ATUALIZAR uma tarefa existente
router.put("/todos/:id", verificarToken, async (req, res) => {
  try {
    // 1. Pegar o ID da tarefa que veio na URL
    const { id } = req.params;
    // 2. Pegar os novos dados que o cliente enviou no corpo
    const { title, completed } = req.body;
    // 3. Pegar o ID do utilizador logado (do nosso segurança)
    const userId = req.user.userId;

    // 4. VERIFICAÇÃO DE SEGURANÇA: O utilizador é mesmo o dono desta tarefa?
    // Procurar por uma tarefa que tenha ESTE ID e que pertença a ESTE UTILIZADOR.
    const todo = await prisma.todo.findFirst({
      where: {
        id: parseInt(id), // O ID da tarefa tem de ser este
        ownerId: userId, // E o dono tem de ser o utilizador logado
      },
    });

    // Se não encontrou nenhuma tarefa que cumpra AMBAS as condições, significa que
    // ou a tarefa não existe, ou pertence a outro utilizador. Em ambos os casos, negamos o acesso.
    if (!todo) {
      return res.status(404).json({
        message: "Tarefa não encontrada ou não pertence ao utilizador.",
      });
    }

    // 5. Se a verificação de segurança passou, atualizar a tarefa
    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(id), // Diz ao Prisma QUAL tarefa atualizar
      },
      data: {
        title, // O novo título
        completed, // O novo status de 'concluído'
      },
    });

    // 6. Enviar a tarefa atualizada de volta como confirmação
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar a tarefa." });
  }
});

router.delete("/todos/:id", verificarToken, async (req, res) => {
  try {
    // 1. Pegar o ID da tarefa que veio na URL
    const { id } = req.params;
    // 2. Pegar o ID do utilizador logado (do nosso segurança)
    const userId = req.user.userId;

    // 3. VERIFICAÇÃO DE SEGURANÇA (Exatamente igual à da atualização)
    // Procurar por uma tarefa que tenha ESTE ID e que pertença a ESTE UTILIZADOR.
    const todo = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
        ownerId: userId,
      },
    });

    // Se não encontrou, negar o acesso
    if (!todo) {
      return res
        .status(404)
        .json({
          message: "Tarefa não encontrada ou não pertence ao utilizador.",
        });
    }

    // 4. Se a verificação de segurança passou, apagar a tarefa
    await prisma.todo.delete({
      where: {
        id: parseInt(id), // Diz ao Prisma QUAL tarefa apagar
      },
    });

    // 5. Enviar uma resposta de sucesso, sem conteúdo
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao apagar a tarefa." });
  }
});
module.exports = router;
