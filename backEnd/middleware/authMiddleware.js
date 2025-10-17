const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  // 1. Pegar o "crachá" (token) do cabeçalho do pedido
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Formato "Bearer TOKEN"

  // 2. Se não houver crachá, barrar a entrada
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." }); // 401 Unauthorized
  }

  // 3. Verificar se o crachá é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // Se o crachá for inválido ou expirado, barrar a entrada
    if (err) {
      return res.status(403).json({ message: "Token inválido." }); // 403 Forbidden
    }

    // 4. Se o crachá for válido, anexar os dados do utilizador ao pedido
    req.user = user;

    // 5. Deixar o pedido passar para o próximo "balcão" (a rota final)
    next();
  });
}

module.exports = verificarToken;
