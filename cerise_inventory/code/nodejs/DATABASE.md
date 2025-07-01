# Configuração do Banco de Dados MySQL

Este projeto utiliza MySQL para desenvolvimento e testes, com o uso de Docker para facilitar a configuração do ambiente.

## 📦 Ambiente com Docker

### 1. Subindo o MySQL com Docker Compose

Um exemplo de serviço MySQL pode ser encontrado no arquivo `docker-compose.yml` do backend, algo semelhante à:

```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    container_name: cerise_mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: inventory
      MYSQL_USER: cerise
      MYSQL_PASSWORD: cerise123
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
volumes:
  mysql_data:
```

### 2. Variáveis de Ambiente

No arquivo `.env` do backend, configure:

```env
DATABASE_URL="mysql://cerise:cerise123@localhost:3306/inventory"
DATABASE_URL_TEST="mysql://cerise:cerise123@localhost:3306/inventory_test"
```

### 3. Comandos Úteis

```bash
# Subir o banco de dados
cd code/nodejs
docker-compose up -d

# Gerar cliente Prisma
yarn prisma generate

# Rodar migrações Prisma
yarn prisma migrate dev

# Executar seed
yarn seed
```

### 4. Acessando o MySQL

Você pode acessar o banco via linha de comando:
```bash
docker exec -it cerise_mysql mysql -u cerise -p
# senha: cerise123
```

Ou usar ferramentas como DBeaver, TablePlus, MySQL Workbench, etc.

## 🗄️ Estrutura do Banco

- **inventory**: banco principal para desenvolvimento
- **inventory_test**: banco para testes automatizados

## ⚠️ Observações
- O MySQL roda em container Docker, facilitando o setup e reset do ambiente.
- Não é necessário instalar o MySQL localmente.
- Os dados são persistidos no volume `mysql_data`.
- Para resetar o banco, basta remover o volume ou rodar os comandos de reset do Prisma.

---

**Cerise Inventory** - Banco de dados MySQL via Docker para desenvolvimento ágil. 