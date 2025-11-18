# 🔐 Guia de Instalação do Sistema de Administração

## 📋 Visão Geral

Este guia explica como configurar o sistema de administração com controle de acesso baseado em roles (RBAC) no Loquia.

## 🎯 Funcionalidades

- ✅ **Sistema de Roles:** user, admin, superadmin
- ✅ **Gerenciamento de Usuários:** CRUD completo
- ✅ **Gerenciamento de Planos:** CRUD completo
- ✅ **Permissões Granulares:** Sistema de permissões por recurso e ação
- ✅ **Proteção de Rotas:** Acesso restrito baseado em role
- ✅ **Row Level Security (RLS):** Segurança no nível do banco de dados

## 📦 Passo 1: Aplicar Migration no Supabase

### Opção A: Via SQL Editor (Recomendado)

1. Acesse o **Supabase Dashboard**:
   - URL: https://supabase.com/dashboard/project/xfvlvfoigbnipezxwmzt

2. Vá em **SQL Editor** (menu lateral esquerdo)

3. Clique em **New Query**

4. Copie todo o conteúdo do arquivo `supabase/migrations/001_admin_system.sql`

5. Cole no editor e clique em **Run**

6. Aguarde a execução (pode levar alguns segundos)

7. Verifique se não há erros no console

### Opção B: Via CLI (Avançado)

```bash
# 1. Configurar connection string
export SUPABASE_DB_URL='postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres'

# 2. Aplicar migration
./scripts/apply-migration.sh
```

## 👤 Passo 2: Promover Usuário a Superadmin

Após aplicar a migration, você precisa promover um usuário existente a superadmin.

### Via SQL Editor

```sql
-- Promover admin@loquia.com a superadmin
SELECT promote_to_superadmin('admin@loquia.com');

-- Verificar se funcionou
SELECT email, role FROM user_profiles WHERE email = 'admin@loquia.com';
```

### Via psql

```bash
psql "$SUPABASE_DB_URL" -c "SELECT promote_to_superadmin('admin@loquia.com');"
```

## 🔍 Passo 3: Verificar Instalação

### 3.1 Verificar Tabelas Criadas

```sql
-- Listar tabelas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'plans', 'permissions', 'role_permissions', 'user_plan_history');
```

Deve retornar 5 tabelas.

### 3.2 Verificar Planos Padrão

```sql
-- Listar planos
SELECT id, name, price, is_active FROM plans;
```

Deve retornar 3 planos: Free, Pro, Enterprise.

### 3.3 Verificar Permissões

```sql
-- Listar permissões
SELECT COUNT(*) FROM permissions;
```

Deve retornar 15 permissões.

### 3.4 Verificar Role do Usuário

```sql
-- Ver role do usuário
SELECT email, role, is_active FROM user_profiles WHERE email = 'admin@loquia.com';
```

Deve mostrar `role = 'superadmin'`.

## 🚀 Passo 4: Acessar Área Admin

1. Faça login em: https://loquia-frontend.vercel.app/login
   - Email: admin@loquia.com
   - Senha: Admin@123456

2. Acesse: https://loquia-frontend.vercel.app/admin

3. Você deve ver o **Painel de Administração** com:
   - Estatísticas de usuários
   - Estatísticas de planos
   - Links para gerenciar usuários e planos

## 📁 Estrutura de Arquivos Criados

```
loquia-frontend/
├── supabase/
│   └── migrations/
│       └── 001_admin_system.sql          # Migration principal
├── scripts/
│   └── apply-migration.sh                # Script para aplicar migration
├── src/
│   ├── hooks/
│   │   └── useAuth.ts                    # Hook de autenticação com roles
│   ├── components/
│   │   └── auth/
│   │       └── RequireRole.tsx           # Componente de proteção de rotas
│   ├── lib/
│   │   └── admin/
│   │       ├── users.ts                  # Funções para gerenciar usuários
│   │       └── plans.ts                  # Funções para gerenciar planos
│   └── app/
│       └── admin/
│           ├── page.tsx                  # Dashboard admin
│           ├── users/
│           │   └── page.tsx              # Gerenciar usuários
│           └── plans/
│               └── page.tsx              # Gerenciar planos
└── ADMIN_SETUP_GUIDE.md                  # Este guia
```

## 🔐 Roles e Permissões

### Roles Disponíveis

| Role | Descrição | Acesso |
|------|-----------|--------|
| `user` | Usuário comum | Apenas leitura |
| `admin` | Administrador | CRUD em catalog, intent, feed |
| `superadmin` | Super administrador | Acesso total, incluindo área admin |

### Permissões por Role

**user:**
- catalog.read
- intent.read
- feed.read

**admin:**
- Todas as permissões de `user`
- catalog.create, catalog.update, catalog.delete
- intent.create, intent.update, intent.delete
- feed.create, feed.update, feed.delete

**superadmin:**
- Todas as permissões de `admin`
- admin.users (gerenciar usuários)
- admin.plans (gerenciar planos)
- admin.permissions (gerenciar permissões)

## 🛡️ Segurança

### Row Level Security (RLS)

Todas as tabelas têm RLS habilitado:

- **user_profiles:** Usuários veem apenas seu próprio perfil, superadmin vê todos
- **plans:** Todos veem planos ativos, apenas superadmin gerencia
- **permissions:** Apenas superadmin gerencia
- **role_permissions:** Apenas superadmin gerencia

### Proteção de Rotas

As rotas `/admin/*` são protegidas pelo componente `RequireRole`:

```tsx
<RequireRole role="superadmin">
  <AdminContent />
</RequireRole>
```

Usuários sem o role correto são redirecionados automaticamente.

## 📊 Planos Padrão

| Plano | Preço | Catálogo | Intenções | Feeds |
|-------|-------|----------|-----------|-------|
| Free | R$ 0/mês | 10 | 5 | 2 |
| Pro | R$ 49,90/mês | 100 | 50 | 20 |
| Enterprise | R$ 199,90/mês | Ilimitado | Ilimitado | Ilimitado |

## 🔧 Funções Úteis

### Promover Usuário a Superadmin

```sql
SELECT promote_to_superadmin('email@example.com');
```

### Verificar Permissão de Usuário

```sql
SELECT has_permission('user_id_aqui', 'admin.users');
```

### Atribuir Plano a Usuário

```typescript
import { assignPlanToUser } from '@/lib/admin/users';

await assignPlanToUser(userId, planId);
```

### Mudar Role de Usuário

```typescript
import { changeUserRole } from '@/lib/admin/users';

await changeUserRole(userId, 'admin');
```

## 🐛 Troubleshooting

### Erro: "permission denied for table user_profiles"

**Causa:** RLS está bloqueando o acesso.

**Solução:** Verifique se o usuário tem o role correto:

```sql
SELECT email, role FROM user_profiles WHERE id = auth.uid();
```

### Erro: "function promote_to_superadmin does not exist"

**Causa:** Migration não foi aplicada corretamente.

**Solução:** Execute novamente a migration via SQL Editor.

### Não consigo acessar /admin

**Causa:** Usuário não tem role `superadmin`.

**Solução:** Promova o usuário:

```sql
SELECT promote_to_superadmin('seu@email.com');
```

Depois faça logout e login novamente.

### Hook useAuth não está funcionando

**Causa:** Tabela `user_profiles` não existe ou não tem dados.

**Solução:** 

1. Verifique se a migration foi aplicada
2. Verifique se o trigger `on_auth_user_created` está ativo
3. Faça logout e login novamente para criar o perfil

## 📝 Próximos Passos

Após a instalação, você pode:

1. **Criar novos usuários** via `/admin/users`
2. **Gerenciar planos** via `/admin/plans`
3. **Atribuir planos a usuários**
4. **Mudar roles de usuários**
5. **Ativar/desativar usuários**

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs do console do navegador (F12)
2. Verifique os logs do Supabase (Dashboard > Logs)
3. Revise este guia novamente
4. Entre em contato com o suporte

---

**Status:** ✅ Sistema pronto para uso  
**Versão:** 1.0.0  
**Data:** 18 de Novembro de 2025
