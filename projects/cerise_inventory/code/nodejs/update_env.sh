#!/bin/bash
cat > .env << 'ENV_CONTENT'
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configurações JWT
SECRET_KEY="shhhhh"
TOKEN_EXPIRES_IN="1d"
RESET_CODE_EXPIRES_IN=1440

# Configurações do Banco de Dados
# Para produção - MySQL
DATABASE_USER=root
DATABASE_PASSWD=mysql
DATABASE_HOST=
DATABASE_PORT=3306
DATABASE_NAME=inventory
DATABASE_URL="mysql://root:mysql@<domain>:3306/inventory"

# Para desenvolvimento - SQLite
DATABASE_URL="file:./dev.db"
# Para testes - SQLite em memória
DATABASE_URL_TEST="file:./test.db"

# Configurações de Log
DEBUG=true
LOG_LEVEL=debug

# Configurações de Segurança
CORS_ORIGIN=http://localhost:3001 
ENV_CONTENT
echo "Arquivo .env atualizado com sucesso!"
