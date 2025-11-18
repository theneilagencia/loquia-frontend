# ⚡ Quick Start - Sistema Admin

## 🎯 Passo a Passo Rápido

### 1️⃣ Aplicar Migration no Supabase

1. Acesse: https://supabase.com/dashboard/project/xfvlvfoigbnipezxwmzt

2. Clique em **SQL Editor** (menu lateral)

3. Clique em **New Query**

4. Abra o arquivo `supabase/migrations/001_admin_system.sql` no GitHub:
   - https://github.com/theneilagencia/loquia-frontend/blob/main/supabase/migrations/001_admin_system.sql

5. Copie **TODO O CONTEÚDO** do arquivo

6. Cole no SQL Editor do Supabase

7. Clique em **Run** (ou pressione Ctrl+Enter)

8. Aguarde ~10 segundos

9. ✅ Se aparecer "Success. No rows returned", está tudo OK!

### 2️⃣ Promover Usuário a Superadmin

1. No mesmo **SQL Editor**, cole este comando:

```sql
SELECT promote_to_superadmin('admin@loquia.com');
```

2. Clique em **Run**

3. ✅ Se aparecer "Success. No rows returned", está OK!

### 3️⃣ Verificar Instalação

Cole e execute:

```sql
-- Verificar role do usuário
SELECT email, role, is_active FROM user_profiles WHERE email = 'admin@loquia.com';
```

Deve mostrar:
- email: admin@loquia.com
- role: **superadmin** ← Importante!
- is_active: true

### 4️⃣ Acessar Área Admin

1. Acesse: https://loquia-frontend.vercel.app/login

2. Faça login:
   - Email: admin@loquia.com
   - Senha: Admin@123456

3. Acesse: https://loquia-frontend.vercel.app/admin

4. ✅ Você deve ver o **Painel de Administração**!

## 🎉 Pronto!

Agora você pode:

- ✅ Gerenciar usuários em `/admin/users`
- ✅ Gerenciar planos em `/admin/plans`
- ✅ Ver estatísticas em `/admin`

## 🐛 Problemas?

### "Não consigo acessar /admin"

**Solução:** Faça logout e login novamente após promover a superadmin.

### "Erro ao carregar usuários/planos"

**Solução:** Verifique se a migration foi aplicada corretamente:

```sql
-- Listar tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user_profiles', 'plans', 'permissions');
```

Deve retornar 3 linhas.

### "Permission denied"

**Solução:** Execute novamente:

```sql
SELECT promote_to_superadmin('admin@loquia.com');
```

E faça logout/login.

---

**Documentação completa:** `ADMIN_SETUP_GUIDE.md`
