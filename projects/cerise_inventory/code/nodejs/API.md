# Documentação da API - Cerise Inventory Backend

## Autenticação

### POST /auth/login
- **Descrição:** Login de usuário
- **Body:** `{ email, password }`
- **Resposta:** `{ token, user }`

### POST /auth/register
- **Descrição:** Registro de novo usuário
- **Body:** `{ name, email, password }`
- **Resposta:** `{ user }`

### GET /auth/me
- **Descrição:** Dados do usuário autenticado
- **Header:** `Authorization: Bearer <token>`
- **Resposta:** `{ user }`

---

## Usuários

### GET /users
- Lista todos os usuários

### GET /users/:id
- Busca usuário por ID

### POST /users
- Cria novo usuário

### PUT /users/:id
- Atualiza usuário

### DELETE /users/:id
- Remove usuário

---

## Inventários

### GET /inventories
- Lista todos os inventários

### GET /inventories/:id
- Busca inventário por ID

### POST /inventories
- Cria novo inventário

### PUT /inventories/:id
- Atualiza inventário

### DELETE /inventories/:id
- Remove inventário

---

## Itens do Inventário

### GET /inventories/:id/items
- Lista itens de um inventário

### POST /inventories/:id/items
- Adiciona item ao inventário

### PUT /inventories/:id/items/:itemId
- Atualiza item

### DELETE /inventories/:id/items/:itemId
- Remove item

---

## Categorias

### GET /categories
- Lista categorias

### POST /categories
- Cria categoria

### PUT /categories/:id
- Atualiza categoria

### DELETE /categories/:id
- Remove categoria

---

## Corporações

### GET /corporations
- Lista corporações

### POST /corporations
- Cria corporação

### PUT /corporations/:id
- Atualiza corporação

### DELETE /corporations/:id
- Remove corporação

---

**Todas as rotas protegidas exigem o header:**
```
Authorization: Bearer <token>
```

**Cerise Inventory** - API RESTful completa para gestão de inventários.
