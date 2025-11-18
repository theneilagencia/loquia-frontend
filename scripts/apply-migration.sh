#!/bin/bash

# Script para aplicar migration no Supabase
# Uso: ./scripts/apply-migration.sh

echo "🚀 Aplicando migration 001_admin_system.sql no Supabase..."

# Verificar se SUPABASE_DB_URL está definida
if [ -z "$SUPABASE_DB_URL" ]; then
  echo "❌ Erro: SUPABASE_DB_URL não está definida"
  echo ""
  echo "Configure a variável de ambiente com a connection string do Supabase:"
  echo "export SUPABASE_DB_URL='postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres'"
  echo ""
  echo "Você pode encontrar a connection string em:"
  echo "Supabase Dashboard > Settings > Database > Connection string"
  exit 1
fi

# Aplicar migration
psql "$SUPABASE_DB_URL" -f supabase/migrations/001_admin_system.sql

if [ $? -eq 0 ]; then
  echo "✅ Migration aplicada com sucesso!"
  echo ""
  echo "📝 Próximos passos:"
  echo "1. Promover admin@loquia.com a superadmin:"
  echo "   psql \"\$SUPABASE_DB_URL\" -c \"SELECT promote_to_superadmin('admin@loquia.com');\""
  echo ""
  echo "2. Verificar role do usuário:"
  echo "   psql \"\$SUPABASE_DB_URL\" -c \"SELECT email, role FROM user_profiles;\""
else
  echo "❌ Erro ao aplicar migration"
  exit 1
fi
