# Cerise Inventory System

Sistema de inventário sendo desenvolvido para os laboratórios do CERISE, contendo backend, frontend web e aplicação mobile.

## 📋 Sumário

- [Cerise Inventory System](#cerise-inventory-system)
  - [📋 Sumário](#-sumário)
  - [🎯 Descrição](#-descrição)
  - [🏗️ Arquitetura](#️-arquitetura)
  - [🚀 Tecnologias](#-tecnologias)
  - [📦 Pré-requisitos](#-pré-requisitos)
  - [⚙️ Instalação](#️-instalação)
  - [🔧 Configuração](#-configuração)
  - [📱 Executando os Projetos](#-executando-os-projetos)
  - [📚 Documentação](#-documentação)
  - [🤝 Contribuição](#-contribuição)
  - [📄 Licença](#-licença)
  - [👥 Contato](#-contato)

## 🎯 Descrição

O Cerise Inventory System é uma solução completa para gerenciamento de inventários, desenvolvida com arquitetura moderna e tecnologias atuais. O sistema permite o controle de inventários, categorias, usuários e corporações, oferecendo uma experiência consistente entre web e mobile.

## 🏗️ Arquitetura

O projeto está organizado em três aplicações principais:

```
cerise_inventory/
├── code/
│   ├── nodejs/          # Backend API (Node.js + Express + Prisma)
│   ├── reactjs/         # Frontend Web (React + TypeScript + Vite)
│   └── react_native/    # Aplicação Mobile (React Native + Expo)
├── documents/           # Documentação do projeto
├── images/             # Imagens e recursos
└── instruments/        # Instrumentos e ferramentas
```

### 🔧 Backend (Node.js)
- **API RESTful** com Express.js
- **Banco de dados** MySQL para desenvolvimento e produção
- **ORM** Prisma para gerenciamento de dados
- **Autenticação** JWT
- **Validação** com Joi
- **Testes** com Vitest

### 🌐 Frontend Web (React)
- **React 18** com TypeScript
- **Vite** como bundler
- **Material-UI** para interface
- **React Router** para navegação
- **Axios** para comunicação com API
- **Formik & Yup** para formulários

### 📱 Aplicação Mobile (React Native)
- **React Native** com Expo
- **TypeScript** para tipagem
- **React Navigation** para navegação
- **AsyncStorage** para persistência
- **Axios** para comunicação com API
- **Design system** customizado

## 🚀 Tecnologias

### Backend
- **Node.js** 18+
- **Express.js** - Framework web
- **Prisma** - ORM
- **MySQL** - Banco de dados
- **JWT** - Autenticação
- **Joi** - Validação
- **Vitest** - Testes

### Frontend Web
- **React** 18
- **TypeScript**
- **Vite**
- **Material-UI**
- **React Router**
- **Axios**
- **Formik & Yup**

### Mobile
- **React Native**
- **Expo**
- **TypeScript**
- **React Navigation**
- **AsyncStorage**
- **Axios**

## 📦 Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** ou **yarn**
- **Git**
- **Expo CLI** (para desenvolvimento mobile)

## ⚙️ Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/incomm-sigpro/cerise-group6-6Gresearch.git
   git checkout kunzler-branch
   cd cerise_inventory
   ```

2. **Instale as dependências do backend:**
   ```bash
   cd code/nodejs
   yarn install
   ```

3. **Instale as dependências do frontend web:**
   ```bash
   cd code/reactjs
   yarn install
   ```

4. **Instale as dependências do mobile:**
   ```bash
   cd code/react_native
   npm install
   ```

## 🔧 Configuração

### Backend
1. Configure o banco de dados MySQL com Docker para desenvolvimento:
   ```bash
   cd code/nodejs
   docker compose up
   ```

2. Em outro terminal, gere o banco de dados e execute as migrações:
   ```bash
   yarn prisma generate
   yarn prisma migrate dev
   ```

3. Execute o seed inicial:
   ```bash
   yarn seed
   ```

### Frontend Web
1. Configure a URL da API em `src/config/index.ts`
2. Ajuste as variáveis de ambiente se necessário

### Mobile
1. Configure a URL da API em `src/config/index.ts`
2. Ajuste as configurações do Expo em `app.json`

## 📱 Executando os Projetos

### Backend
```bash
cd code/nodejs
yarn dev               # Desenvolvimento
yarn test              # Testes
```

### Frontend Web
```bash
cd code/reactjs
yarn dev         # Desenvolvimento
yarn deploy      # Build para produção
yarn preview     # Preview do build
```

### Mobile
```bash
cd code/react_native
npm start           # Iniciar servidor Expo
npm run android     # Executar no Android
npm run ios         # Executar no iOS
npm run web         # Executar na web
```

## 📚 Documentação

### Documentação Específica
- **Backend**: [README.md](code/nodejs/README.md)
- **Frontend Web**: [README.md](code/reactjs/README.md)
- **Mobile**: [README.md](code/react_native/README.md)
- **Banco de Dados**: [DATABASE.md](code/nodejs/DATABASE.md)

### Funcionalidades

#### ✅ Implementado
- [x] Sistema de autenticação completo
- [x] CRUD de usuários
- [x] CRUD de inventários
- [x] CRUD de categorias
- [x] CRUD de corporações
- [x] Dashboard responsivo
- [x] Interface mobile nativa
- [x] Banco de dados SQLite
- [x] Testes automatizados
- [x] Documentação completa

#### 🚧 Em Desenvolvimento
- [ ] Upload de imagens
- [ ] Relatórios avançados
- [ ] Notificações push
- [ ] Sincronização offline
- [ ] Analytics e métricas

## 🤝 Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adicionar nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

### Padrões de Código
- Use **TypeScript** em todos os projetos
- Siga as **convenções** de cada framework
- Escreva **testes** para novas funcionalidades
- Mantenha a **documentação** atualizada

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Contato

- **Nome**: Dr. Jonas Augusto Kunzler
- **E-mail**: <k_jonasaugusto@ufg.br>
- **GitHub**: [@jakunzler](https://github.com/jakunzler)

---

**Cerise Inventory System** - Sistema completo de gerenciamento de inventários 🚀
