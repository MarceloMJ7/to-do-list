# To-Do List Full-Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

Uma aplicação de lista de tarefas (To-Do List) completa, construída do zero com uma arquitetura Full-Stack, utilizando Node.js no back-end e React no front-end. O projeto demonstra a criação de uma API RESTful segura, interação com banco de dados, autenticação de utilizadores e uma interface de utilizador moderna e reativa.

## ✨ Principais Funcionalidades

- **Autenticação de Utilizadores:** Sistema completo de registo e login.
- **Segurança com JWT:** Acesso às rotas da API protegido por JSON Web Tokens.
- **Rotas Protegidas:** O front-end impede o acesso a páginas restritas por utilizadores não autenticados.
- **Operações CRUD Completas:** Os utilizadores podem Criar, Ler, Atualizar e Apagar as suas próprias tarefas.
- **Persistência de Dados:** Todas as informações são armazenadas num banco de dados PostgreSQL.
- **Interface Moderna:** Interface construída com React e a biblioteca de componentes Material-UI (MUI) para um design limpo e profissional.

## 🚀 Tecnologias Utilizadas

Este projeto é um monorepo com duas aplicações principais: `backend` e `frontend`.

### Back-end

- **Node.js:** Ambiente de execução para o JavaScript no servidor.
- **Express.js:** Framework para a construção da API RESTful.
- **Prisma:** ORM para a interação com o banco de dados, facilitando as queries e migrações.
- **PostgreSQL:** Banco de dados relacional para armazenamento dos dados.
- **JSON Web Tokens (JWT):** Para a implementação do sistema de autenticação stateless.
- **bcryptjs:** Para a encriptação (hashing) segura das senhas dos utilizadores.
- **cors:** Para permitir a comunicação entre o front-end e o back-end.

### Front-end

- **React:** Biblioteca para a construção da interface de utilizador.
- **Vite:** Ferramenta de build extremamente rápida para o ambiente de desenvolvimento.
- **React Router DOM:** Para a gestão de rotas e navegação entre páginas (SPA).
- **React Context API:** Para a gestão de estado global (autenticação do utilizador).
- **Axios:** Cliente HTTP para a comunicação com a API do back-end.
- **Material-UI (MUI):** Biblioteca de componentes para um design moderno e consistente.

## ⚙️ Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto no seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)
- Uma instância de banco de dados PostgreSQL. Recomenda-se o serviço gratuito da [Neon](https://neon.tech/).

### 1. Configuração do Back-end

Abra um terminal e siga os passos:

```bash
# 1. Navegue até à pasta do back-end
cd backend

# 2. Instale as dependências
npm install

# 3. Crie um ficheiro .env na raiz da pasta /backend e adicione as seguintes variáveis:
# DATABASE_URL="SUA_URL_DE_CONEXAO_DO_POSTGRESQL_AQUI"
# JWT_SECRET="SUA_FRASE_SECRETA_PARA_O_JWT_AQUI"

# 4. Execute as migrações do Prisma para criar as tabelas no banco de dados
npx prisma migrate dev

# 5. Inicie o servidor do back-end (geralmente em http://localhost:3001)
npm run dev
```

Deixe este terminal aberto.

### 2. Configuração do Front-end

Abra um **segundo terminal** e siga os passos:

```bash
# 1. Navegue até à pasta do front-end
cd frontend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento do front-end (geralmente em http://localhost:5173)
npm run dev
```

Agora, basta aceder a `http://localhost:5173` no seu navegador para usar a aplicação!

## 👨‍💻 Autor

Feito por **Marcelo**.

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcelomj/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MarceloMJ7)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o ficheiro [LICENSE](LICENSE) para mais detalhes.
