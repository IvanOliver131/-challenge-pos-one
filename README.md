# 📦 Projeto - Server e Web

Este projeto é dividido em duas partes: **Server** (backend) e **Web** (frontend). Siga os passos abaixo para configurar e executar localmente.

---

## 🚀 Server

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

### Instalação

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env
   ```

   - Edite o arquivo `.env` com as configurações necessárias.

3. Suba os containers com Docker:

   ```bash
   docker-compose up -d
   ```

4. Gere e aplique as migrações do banco de dados:

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## 🌐 Web

### Pré-requisitos

- [Node.js](https://nodejs.org/)

### Instalação

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente:

   ```bash
   cp .env.example .env
   ```

   - Edite o arquivo `.env` com as configurações necessárias.

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## 🛠️ Estrutura

- `server/`: código do backend
- `web/`: código do frontend

---

## 📄 Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).
