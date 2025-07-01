# Cerise Inventory Backend

API RESTful para o sistema de inventário Cerise, desenvolvida com Node.js, Express, Prisma e MySQL.

## 📋 Sumário

- [Cerise Inventory Backend](#cerise-inventory-backend)
  - [📋 Sumário](#-sumário)
  - [🎯 Descrição](#-descrição)
  - [🏗️ Arquitetura](#️-arquitetura)
  - [🚀 Tecnologias](#-tecnologias)
  - [📦 Pré-requisitos](#-pré-requisitos)
  - [⚙️ Instalação](#️-instalação)
  - [🔧 Configuração](#-configuração)
  - [📡 API Endpoints](#-api-endpoints)
  - [🧪 Testes](#-testes)
  - [📊 Banco de Dados](#-banco-de-dados)
  - [🔒 Autenticação](#-autenticação)
  - [📚 Documentação](#-documentação)
  - [🤝 Contribuição](#-contribuição)

## 🎯 Descrição

Backend completo para o sistema de inventário Cerise, oferecendo uma API RESTful robusta com autenticação JWT, validação de dados, ORM moderno e testes automatizados. O sistema gerencia usuários, inventários, categorias e corporações.

## 🏗️ Arquitetura

```
src/
├── config/             # Configurações da aplicação
├── db/                 # Configuração do banco de dados
│   ├── prisma.ts       # Cliente Prisma
│   ├── schema.prisma   # Schema do banco
│   └── seed.ts         # Dados iniciais
├── exceptions/         # Tratamento de exceções
├── hooks/              # Hooks personalizados
├── models/             # Modelos de dados
├── modules/            # Módulos da aplicação
│   ├── auth/           # Autenticação
│   ├── categories/     # Categorias
│   ├── corporations/   # Corporações
│   ├── inventories/    # Inventários
│   └── users/          # Usuários
├── providers/          # Provedores de serviços
├── routes/             # Rotas da API
├── tests/              # Testes automatizados
├── utils/              # Utilitários
└── index.ts            # Ponto de entrada
```

## 🚀 Tecnologias

### Core
- **Node.js** 18+ - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **Prisma** - ORM moderno
- **MySQL** - Banco de dados

### Autenticação & Segurança
- **JWT** - JSON Web Tokens
- **Argon2** - Hash de senhas
- **Passport.js** - Estratégias de autenticação
- **CORS** - Cross-Origin Resource Sharing

### Validação & Validação
- **Joi** - Validação de schemas
- **Express Validator** - Validação de requisições

### Testes
- **Vitest** - Framework de testes
- **Supertest** - Testes de API
- **@vitest/ui** - Interface de testes

### Desenvolvimento
- **ts-node-dev** - Hot reload
- **ESLint** - Linting
- **Prettier** - Formatação
- **Nodemon** - Monitor de arquivos

## 📦 Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** ou **yarn**
- **Git**

## ⚙️ Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/incomm-sigpro/cerise-group6-6Gresearch.git
   git checkout kunzler-branch
   cd cerise_inventory/code/nodejs
   ```

2. **Instale as dependências:**
   ```bash
   yarn install
   ```

3. **Configure o ambiente:**
   ```bash
   cp env.example .env
   # Edite o arquivo .env com suas configurações
   ```

## 🔧 Configuração

### Banco de Dados

1. **Configure o banco MySQL:**
   ```bash
   docker compose up
   ```

2. **Execute as migrações:**
   ```bash
   yarn prisma generate
   yarn prisma migrate dev
   ```

3. **Execute o seed inicial:**
   ```bash
   yarn seed
   ```

### Variáveis de Ambiente

Sugestão de arquivo `.env` baseado no `env.example`:

```env
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configurações JWT
SECRET_KEY="sua-chave-secreta"
TOKEN_EXPIRES_IN="1d"
RESET_CODE_EXPIRES_IN=1440

# Configurações do Banco de Dados
DATABASE_USER=root
DATABASE_PASSWD=mysql
DATABASE_HOST=
DATABASE_PORT=3308
DATABASE_NAME=cerise-inventory
DATABASE_URL="mysql://root:mysql@localhost:3308/cerise-inventory"

# Para testes
DATABASE_URL_TEST="mysql://root:mysql@localhost:3308/cerise-inventory-test"

# Configurações de Log
DEBUG=true
LOG_LEVEL=debug

# Configurações de Segurança
CORS_ORIGIN=http://localhost:3000
```

## 📡 API Endpoints

### Autenticação
```
POST   /user/login          # Login de usuário
POST   /user/register       # Registro de usuário
POST   /user/logout         # Logout
GET    /user/me             # Dados do usuário atual
```

### Usuários
```
GET    /user                # Listar usuários
GET    /user/:id            # Buscar usuário
POST   /user                # Criar usuário
PUT    /user/:id            # Atualizar usuário
DELETE /user/:id            # Deletar usuário
```

### Inventários
```
GET    /inventories         # Listar inventários
GET    /inventories/:id     # Buscar inventário
POST   /inventories         # Criar inventário
PUT    /inventories/:id     # Atualizar inventário
DELETE /inventories/:id     # Deletar inventário
```

### Itens do Inventário
```
GET    /inventories/:id/items           # Listar itens
GET    /inventories/:id/items/:itemId   # Buscar item
POST   /inventories/:id/items           # Criar item
PUT    /inventories/:id/items/:itemId   # Atualizar item
DELETE /inventories/:id/items/:itemId   # Deletar item
```

### Categorias
```
GET    /categories          # Listar categorias
GET    /categories/:id      # Buscar categoria
POST   /categories          # Criar categoria
PUT    /categories/:id      # Atualizar categoria
DELETE /categories/:id      # Deletar categoria
```

### Corporações
```
GET    /corporations        # Listar corporações
GET    /corporations/:id    # Buscar corporação
POST   /corporations        # Criar corporação
PUT    /corporations/:id    # Atualizar corporação
DELETE /corporations/:id    # Deletar corporação
```

## 🧪 Testes

### Executar Testes
```bash
yarn test                    # Executar todos os testes
yarn test:watch              # Executar em modo watch
yarn test:coverage           # Executar com cobertura
yarn test:ui                 # Interface visual dos testes
```

### Tipos de Testes
- **Testes Unitários**: Funções individuais
- **Testes de Integração**: Endpoints da API
- **Testes de Banco**: Operações de dados

## 📊 Banco de Dados

### Estrutura
- **MySQL** para desenvolvimento e testes
- **Prisma** como ORM
- **Migrações** automáticas
- **Seed** com dados iniciais

### Modelos Principais
- **User**: Usuários do sistema
- **Inventory**: Inventários
- **InventoryItem**: Itens dos inventários
- **Category**: Categorias de itens
- **Corporation**: Corporações
- **PermissionGroup**: Grupos de permissões

## 🔒 Autenticação

### JWT (JSON Web Tokens)
- **Secret Key** configurável
- **Expiração** personalizável
- **Refresh tokens** (futuro)

### Estratégias
- **Local Strategy**: Email/senha
- **JWT Strategy**: Token validation
- **Token Strategy**: API tokens

### Middleware
- **Auth Guard**: Proteção de rotas
- **Role Guard**: Controle de permissões
- **Validation**: Validação de dados

## 📚 Documentação

### Documentação Adicional
- [DATABASE.md](DATABASE.md) - Configuração do banco de dados
- [API.md](API.md) - Documentação completa da API
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guia de deploy

## 🤝 Contribuição

1. **Fork** o projeto
2. **Crie** uma branch para sua feature
3. **Commit** suas mudanças
4. **Push** para a branch
5. **Abra** um Pull Request

### Padrões de Código
- Use **TypeScript** em todo o código
- Siga as **convenções** do ESLint
- Escreva **testes** para novas funcionalidades
- Mantenha a **documentação** atualizada

---

**Cerise Inventory Backend** - API robusta e escalável 🚀
