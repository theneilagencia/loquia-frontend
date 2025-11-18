# 🎯 Guia de Teste do Sistema Admin

## ✅ Status Atual

### Banco de Dados
- ✅ Tabelas criadas com sucesso
- ✅ Perfil do usuário admin@loquia.com criado
- ✅ Role definido como **superadmin**
- ✅ RLS Policies configuradas corretamente

### Código
- ✅ Hook `useAuth` implementado
- ✅ Componente `RequireRole` implementado
- ✅ Páginas admin criadas (`/admin`, `/admin/users`, `/admin/plans`)
- ✅ Libs de gerenciamento implementadas

### Deploy
- ✅ Código enviado para GitHub
- ✅ Deploy automático no Vercel concluído

---

## 🧪 Como Testar

### Opção 1: Testar Localmente (Recomendado)

```bash
# 1. Clonar repositório
cd /home/ubuntu/loquia-frontend

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
# Criar arquivo .env.local com:
NEXT_PUBLIC_SUPABASE_URL=https://jseakzogtclvlbkdksqc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzZWFrem9ndGNsdmxia2Rrc3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMjgzNTEsImV4cCI6MjA3ODcwNDM1MX0.uyjPMjcY9llzwgnHEvX1f4pAD-bOTg7N2vaMCIN_zDY

# 4. Rodar em modo dev
npm run dev

# 5. Acessar
# http://localhost:3000/login
# Email: admin@loquia.com
# Senha: Admin@123456

# 6. Depois de logar, acessar:
# http://localhost:3000/admin
```

### Opção 2: Testar em Produção (Vercel)

```bash
# 1. Limpar cache do navegador
# Chrome: Ctrl+Shift+Delete > Limpar dados de navegação

# 2. Abrir em aba anônima
# Chrome: Ctrl+Shift+N

# 3. Acessar
https://loquia-frontend.vercel.app/login

# 4. Fazer login
Email: admin@loquia.com
Senha: Admin@123456

# 5. Acessar área admin
https://loquia-frontend.vercel.app/admin
```

---

## 🔍 Diagnóstico de Problemas

### Se aparecer "Verificando permissões..." infinitamente:

**Causa:** Hook `useAuth` não está conseguindo buscar o perfil do usuário.

**Solução:**

1. Abrir console do navegador (F12)
2. Procurar por erros relacionados a:
   - `Error loading profile`
   - `Row Level Security`
   - `permission denied`

3. Se aparecer erro de RLS, executar no SQL Editor do Supabase:

```sql
-- Verificar se perfil existe
SELECT * FROM public.user_profiles WHERE email = 'admin@loquia.com';

-- Se não existir, criar manualmente
INSERT INTO public.user_profiles (id, email, role, is_active)
SELECT id, email, 'superadmin'::user_role, true
FROM auth.users WHERE email = 'admin@loquia.com';
```

### Se for redirecionado para /login ao acessar /admin:

**Causa:** Componente `RequireRole` detectou que usuário não tem permissão.

**Solução:**

1. Verificar se perfil tem role superadmin:

```sql
SELECT email, role FROM public.user_profiles WHERE email = 'admin@loquia.com';
```

2. Se role não for superadmin, atualizar:

```sql
UPDATE public.user_profiles 
SET role = 'superadmin'::user_role 
WHERE email = 'admin@loquia.com';
```

---

## 📊 Estrutura do Sistema Admin

### Rotas Disponíveis

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/admin` | Dashboard administrativo | Superadmin |
| `/admin/users` | Gerenciar usuários | Superadmin |
| `/admin/plans` | Gerenciar planos | Superadmin |

### Funcionalidades Implementadas

#### `/admin` - Dashboard
- Estatísticas gerais
- Total de usuários
- Total de planos
- Links rápidos para gerenciamento

#### `/admin/users` - Gerenciar Usuários
- Listar todos os usuários
- Visualizar detalhes (email, role, plano, status)
- Mudar role (user, admin, superadmin)
- Ativar/desativar usuários
- Filtrar e buscar

#### `/admin/plans` - Gerenciar Planos
- Listar todos os planos
- Visualizar detalhes (nome, preço, features, limites)
- Ativar/desativar planos
- Ver usuários por plano

---

## 🔐 Segurança

### Row Level Security (RLS)

Todas as tabelas têm RLS habilitado:

- **user_profiles**: Superadmin pode ver/editar todos, usuários comuns só veem seu próprio perfil
- **plans**: Todos podem ver planos ativos, apenas superadmin pode gerenciar
- **permissions**: Apenas superadmin pode gerenciar
- **role_permissions**: Apenas superadmin pode gerenciar
- **user_plan_history**: Superadmin vê tudo, usuários veem apenas seu histórico

### Proteção de Rotas

- Client-side: Componente `RequireRole` verifica role antes de renderizar
- Server-side: Policies RLS no Supabase garantem segurança dos dados

---

## 📝 Próximos Passos (Opcional)

1. **Adicionar paginação** nas listas de usuários e planos
2. **Implementar busca avançada** com filtros múltiplos
3. **Adicionar gráficos** no dashboard (Chart.js ou Recharts)
4. **Criar logs de auditoria** para rastrear ações admin
5. **Implementar notificações** para mudanças de plano/role
6. **Adicionar exportação** de dados (CSV, PDF)
7. **Criar testes automatizados** para fluxo de admin

---

## 🆘 Suporte

Se encontrar problemas:

1. Verificar logs do console do navegador (F12)
2. Verificar logs do Supabase (Dashboard > Logs)
3. Testar queries SQL diretamente no SQL Editor
4. Verificar se variáveis de ambiente estão corretas
5. Limpar cache e testar em aba anônima

---

## ✅ Checklist de Validação

- [ ] Perfil admin@loquia.com existe na tabela user_profiles
- [ ] Role do perfil é 'superadmin'
- [ ] RLS policies estão ativas
- [ ] Login funciona corretamente
- [ ] Dashboard (/dashboard) carrega
- [ ] Área admin (/admin) carrega sem redirecionar
- [ ] Console não mostra erros de RLS
- [ ] Hook useAuth retorna isSuperAdmin = true

---

**Última atualização:** 18/11/2025
**Status:** Sistema implementado, aguardando teste final
