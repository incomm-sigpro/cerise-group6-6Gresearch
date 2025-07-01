# Cerise Inventory Mobile

Aplicação mobile do sistema de inventário Cerise, desenvolvida com React Native e Expo.

## 🚀 Tecnologias

- React Native
- Expo
- TypeScript
- React Navigation
- Axios
- AsyncStorage
- Formik & Yup

## 📱 Funcionalidades

- **Autenticação**: Login e logout de usuários
- **Dashboard**: Visão geral dos inventários
- **Inventários**: Gerenciamento de inventários
- **Categorias**: Gerenciamento de categorias
- **Usuários**: Gerenciamento de usuários
- **Configurações**: Configurações do sistema

## 🛠️ Configuração

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go app no seu dispositivo móvel

### Instalação

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar API:**
   - Edite o arquivo `src/config/index.ts`
   - Ajuste a URL da API conforme necessário

3. **Executar o projeto:**
   ```bash
   npm start
   ```

## 📱 Executando a Aplicação

### Desenvolvimento

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS (apenas macOS)
npm run ios

# Executar na web
npm run web
```

### Produção

```bash
# Build para Android
expo build:android

# Build para iOS
expo build:ios
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button/
│   └── Input/
├── contexts/           # Contextos React
│   └── AuthContext.tsx
├── navigation/         # Navegação
│   └── AppNavigator.tsx
├── pages/             # Telas da aplicação
│   ├── Auth/
│   └── Dashboard/
├── services/          # Serviços de API
│   └── api.ts
├── types/             # Tipos TypeScript
│   └── index.ts
└── config/            # Configurações
    └── index.ts
```

## 🔧 Configurações

### API Backend

A aplicação se conecta ao backend Node.js. Certifique-se de que:

1. O backend está rodando na porta 3000
2. A URL da API está configurada corretamente em `src/config/index.ts`
3. O CORS está configurado no backend para aceitar requisições do mobile

### Variáveis de Ambiente

Para diferentes ambientes, você pode criar arquivos `.env`:

```env
API_BASE_URL=http://localhost:3000
```

## 📱 Funcionalidades Implementadas

### ✅ Concluído

- [x] Estrutura base do projeto
- [x] Autenticação (login/logout)
- [x] Navegação por abas
- [x] Dashboard principal
- [x] Componentes reutilizáveis
- [x] Integração com API
- [x] Persistência de dados

### 🚧 Em Desenvolvimento

- [ ] Tela de inventários
- [ ] Tela de categorias
- [ ] Tela de usuários
- [ ] Tela de configurações
- [ ] Formulários de criação/edição
- [ ] Upload de imagens
- [ ] Notificações push

## 🐛 Solução de Problemas

### Erro de conexão com API

1. Verifique se o backend está rodando
2. Confirme a URL da API em `src/config/index.ts`
3. Verifique se o CORS está configurado no backend

### Erro de build

1. Limpe o cache: `expo r -c`
2. Reinstale as dependências: `npm install`
3. Verifique se todas as dependências estão instaladas

### Problemas de navegação

1. Verifique se o React Navigation está instalado corretamente
2. Confirme se os ícones estão sendo importados corretamente

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request 