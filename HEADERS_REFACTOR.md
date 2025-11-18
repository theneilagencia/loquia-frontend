# Refatoração de Headers e Layouts

## Resumo das Alterações

Implementação completa de layouts públicos e privados com headers corretos, eliminando duplicação e padronizando a logo.

---

## 1. Componentes Criados

### Logo.tsx (`src/app/components/ui/Logo.tsx`)
Componente padronizado para exibir a logo do Loquia.

**Props:**
- `variant`: 'black' | 'white' (padrão: 'black')
- `size`: 'sm' | 'md' | 'lg' (padrão: 'md')
- `href`: string (padrão: '/')

**Uso:**
```tsx
<Logo size="md" href="/dashboard" />
```

### PublicHeader.tsx (`src/app/components/ui/PublicHeader.tsx`)
Header para páginas públicas (antes do login).

**Características:**
- Logo do Loquia
- Links: Como funciona, Planos, Dashboard
- Botões: Entrar, Criar conta
- Menu mobile responsivo

### PrivateHeader.tsx (`src/app/components/ui/PrivateHeader.tsx`)
Header para páginas privadas (após login).

**Características:**
- Logo do Loquia (link para /dashboard)
- Links: Dashboard, Catálogo, Intenções, Feeds
- Email do usuário autenticado
- Botão "Onboarding" (ícone Play)
- Botão "ADMIN" (apenas para superadmin)
- Botão "Sair" (ícone LogOut)
- Menu mobile responsivo

**Props:**
- `userEmail`: string (email do usuário)
- `isSuperAdmin`: boolean (exibe botão ADMIN)
- `onOpenOnboarding`: função para abrir onboarding

---

## 2. Estrutura de Layouts

### RootLayout (`src/app/layout.tsx`)
Layout raiz sem header. Apenas ToastProvider.

### PublicLayout (`src/app/(public)/layout.tsx`)
Layout para rotas públicas.

**Estrutura:**
```
PublicHeader
  {children}
Footer
```

**Rotas:**
- `/` (homepage)
- `/login`
- `/signup`

### PrivateLayout (`src/app/(private)/layout.tsx`)
Layout para rotas privadas.

**Estrutura:**
```
PrivateHeader
  {children}
Onboarding (condicional)
```

**Funcionalidades:**
- Verifica autenticação (redireciona para /login se não autenticado)
- Detecta superadmin por email
- Controla exibição do onboarding (automático no primeiro login)
- Fornece função para abrir onboarding manualmente

**Rotas:**
- `/dashboard`
- `/catalog`
- `/intent`
- `/feeds`
- `/admin/*`

---

## 3. Onboarding

### Automático
- Exibido automaticamente no primeiro login
- Verifica flag `loquia_onboarding_completed` no localStorage
- Após conclusão, salva flag para não exibir novamente

### Manual
- Botão "Onboarding" no PrivateHeader
- Reabre o modal do onboarding a qualquer momento
- Funciona em desktop e mobile

---

## 4. Logout

### Funcionalidade Completa
```tsx
async function handleLogout() {
  await supabase.auth.signOut();
  
  // Limpar localStorage
  localStorage.removeItem("loquia_onboarding_completed");
  localStorage.removeItem("sb-access-token");
  localStorage.removeItem("sb-refresh-token");
  
  showSuccess("Logout realizado com sucesso");
  router.push("/login");
}
```

**Limpeza:**
- Sessão do Supabase
- Tokens de autenticação
- Flag de onboarding
- Redireciona para /login

---

## 5. Arquivos Modificados

### Criados
- `src/app/components/ui/Logo.tsx`
- `src/app/components/ui/PublicHeader.tsx`
- `src/app/components/ui/PrivateHeader.tsx`
- `src/app/(public)/layout.tsx`
- `src/app/(private)/layout.tsx`

### Modificados
- `src/app/layout.tsx` - Removido Navbar
- `src/app/(private)/dashboard/page.tsx` - Removido header duplicado e lógica de onboarding

### Movidos
**Para (public):**
- `src/app/page.tsx` → `src/app/(public)/page.tsx`
- `src/app/login/` → `src/app/(public)/login/`
- `src/app/signup/` → `src/app/(public)/signup/`

**Para (private):**
- `src/app/dashboard/` → `src/app/(private)/dashboard/`
- `src/app/catalog/` → `src/app/(private)/catalog/`
- `src/app/intent/` → `src/app/(private)/intent/`
- `src/app/feeds/` → `src/app/(private)/feeds/`
- `src/app/admin/` → `src/app/(private)/admin/`

---

## 6. Checklist de Validação

### Header Público
- ✅ Aparece apenas em rotas públicas (/, /login, /signup)
- ✅ Logo correta
- ✅ Links funcionando
- ✅ Botões Entrar e Criar conta
- ✅ Menu mobile responsivo

### Header Privado
- ✅ Aparece apenas em rotas privadas após login
- ✅ Logo correta (link para /dashboard)
- ✅ Email do usuário visível
- ✅ Botão Onboarding funcional
- ✅ Botão ADMIN (apenas para superadmin)
- ✅ Botão Sair funcional
- ✅ Menu mobile responsivo

### Onboarding
- ✅ Abre automaticamente no primeiro login
- ✅ Botão manual no header
- ✅ Flag salva após conclusão
- ✅ Funciona em desktop e mobile

### Logout
- ✅ Limpa sessão do Supabase
- ✅ Limpa localStorage
- ✅ Redireciona para /login
- ✅ Funciona em desktop e mobile

### Geral
- ✅ Sem headers duplicados
- ✅ Sem flicker ao carregar
- ✅ Proteção de rotas funcionando
- ✅ Logo padronizada em todo o sistema

---

## 7. Testes Realizados

### Desktop
- ✅ Navegação em rotas públicas
- ✅ Login e redirecionamento
- ✅ Dashboard carrega com header correto
- ✅ Onboarding automático
- ✅ Onboarding manual via botão
- ✅ Logout e limpeza

### Mobile (Responsivo)
- ✅ Menu mobile funciona
- ✅ Todos os botões acessíveis
- ✅ Onboarding responsivo

### Fluxo Completo
1. ✅ Acessa homepage (PublicHeader visível)
2. ✅ Clica em "Entrar"
3. ✅ Faz login
4. ✅ Redireciona para /dashboard (PrivateHeader visível)
5. ✅ Onboarding abre automaticamente
6. ✅ Conclui onboarding
7. ✅ Clica em "Onboarding" no header (reabre)
8. ✅ Navega entre páginas privadas (header persiste)
9. ✅ Clica em "Sair"
10. ✅ Redireciona para /login (PublicHeader visível)

---

## 8. Próximos Passos (Opcional)

### Melhorias Futuras
- [ ] Adicionar animações de transição entre headers
- [ ] Implementar dark mode
- [ ] Adicionar notificações no header
- [ ] Implementar busca global no header privado
- [ ] Adicionar avatar do usuário

### Otimizações
- [ ] Lazy loading de componentes pesados
- [ ] Memoização de componentes estáticos
- [ ] Prefetch de rotas privadas após login

---

## 9. Suporte

Para dúvidas ou problemas, consulte:
- Código-fonte: `src/app/components/ui/`
- Layouts: `src/app/(public)/` e `src/app/(private)/`
- Documentação do Next.js: https://nextjs.org/docs/app/building-your-application/routing/route-groups
