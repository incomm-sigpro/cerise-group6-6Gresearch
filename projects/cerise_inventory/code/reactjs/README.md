# Cerise Inventory Frontend

Interface web do sistema de inventário Cerise, desenvolvida com React, TypeScript e Vite.

## 🚀 Tecnologias
- React 18 + TypeScript
- Vite
- Material-UI (MUI)
- Axios
- React Router
- Formik & Yup

## 📦 Instalação

```bash
cd code/reactjs
npm install
```

## ⚙️ Configuração

- Configure a URL da API em `src/config/index.ts` para apontar para o backend (ex: `http://localhost:3000`).
- O backend deve estar rodando e acessível.

## 🛠️ Comandos

```bash
yarn dev       # Desenvolvimento
yarn build     # Build de produção
yarn preview   # Preview do build
yarn lint      # Lint do código
```

## 📚 Estrutura
```
src/
├── components/   # Componentes reutilizáveis
├── pages/        # Páginas principais
├── services/     # Serviços de API
├── contexts/     # Contextos globais
├── hooks/        # Hooks customizados
├── styles/       # Estilos globais
├── utils/        # Utilitários
└── config/       # Configurações
```

## 🔐 Autenticação
- Login e registro de usuários
- Proteção de rotas
- Integração JWT com backend

## 📦 Funcionalidades
- Dashboard de inventários
- CRUD de inventários, categorias, usuários e corporações
- Interface responsiva e moderna

## 🧪 Testes
- Recomenda-se testar a integração com o backend rodando via Docker/MySQL

---
**Cerise Inventory** - Frontend web moderno e integrado ao backend MySQL.
