#!/bin/bash

echo "🚀 Configurando banco de dados SQLite..."

# Verificar se o Prisma CLI está instalado
if ! command -v npx prisma &> /dev/null; then
    echo "❌ Prisma CLI não encontrado. Instalando dependências..."
    yarn install
fi

# Configurar banco de desenvolvimento
echo "📦 Configurando banco de desenvolvimento..."
export DATABASE_URL="file:./dev.db"
npx prisma migrate reset --force
npx prisma generate
npx prisma db push

# Executar seed para desenvolvimento
echo "🌱 Executando seed para desenvolvimento..."
yarn seed

# Configurar banco de testes
echo "🧪 Configurando banco de testes..."
export DATABASE_URL="file:./test.db"
npx prisma migrate reset --force
npx prisma db push

echo "✅ Banco de dados SQLite configurado com sucesso!"
echo "📁 Arquivos criados:"
echo "   - dev.db (desenvolvimento)"
echo "   - test.db (testes)"
echo ""
echo "🔧 Para executar o servidor: yarn dev"
echo "🧪 Para executar os testes: yarn test" 