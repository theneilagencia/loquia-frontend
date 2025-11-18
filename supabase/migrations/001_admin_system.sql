-- =====================================================
-- SISTEMA DE ADMINISTRAÇÃO COM ROLES E PLANOS
-- =====================================================

-- 1. ENUM para roles
CREATE TYPE user_role AS ENUM ('user', 'admin', 'superadmin');

-- 2. TABELA: user_profiles
-- Estende auth.users com informações adicionais
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'user',
  plan_id UUID,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABELA: plans
-- Gerenciamento de planos de assinatura
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  billing_period TEXT NOT NULL DEFAULT 'monthly', -- monthly, yearly, lifetime
  features JSONB NOT NULL DEFAULT '[]',
  max_catalog_items INTEGER,
  max_intents INTEGER,
  max_feeds INTEGER,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABELA: user_plan_history
-- Histórico de mudanças de planos
CREATE TABLE IF NOT EXISTS public.user_plan_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.plans(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. TABELA: permissions
-- Permissões granulares (opcional, para futuro)
CREATE TABLE IF NOT EXISTS public.permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  resource TEXT NOT NULL, -- catalog, intent, feed, admin, etc
  action TEXT NOT NULL, -- create, read, update, delete
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. TABELA: role_permissions
-- Associação entre roles e permissões
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role user_role NOT NULL,
  permission_id UUID NOT NULL REFERENCES public.permissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(role, permission_id)
);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plans_updated_at
  BEFORE UPDATE ON public.plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para criar user_profile quando um usuário é criado
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_plan_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Policies para user_profiles
-- Superadmin pode ver e editar todos
CREATE POLICY "Superadmin can view all profiles"
  ON public.user_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

CREATE POLICY "Superadmin can update all profiles"
  ON public.user_profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

CREATE POLICY "Superadmin can delete profiles"
  ON public.user_profiles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

-- Usuários podem ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    -- Usuários não podem mudar seu próprio role
    (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = role
  );

-- Policies para plans
-- Todos podem ver planos ativos
CREATE POLICY "Anyone can view active plans"
  ON public.plans FOR SELECT
  USING (is_active = true);

-- Apenas superadmin pode gerenciar planos
CREATE POLICY "Superadmin can manage plans"
  ON public.plans FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

-- Policies para user_plan_history
-- Superadmin pode ver todo histórico
CREATE POLICY "Superadmin can view all plan history"
  ON public.user_plan_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

-- Usuários podem ver seu próprio histórico
CREATE POLICY "Users can view own plan history"
  ON public.user_plan_history FOR SELECT
  USING (auth.uid() = user_id);

-- Policies para permissions e role_permissions
-- Apenas superadmin pode gerenciar
CREATE POLICY "Superadmin can manage permissions"
  ON public.permissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

CREATE POLICY "Superadmin can manage role permissions"
  ON public.role_permissions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

-- =====================================================
-- DADOS INICIAIS
-- =====================================================

-- Inserir planos padrão
INSERT INTO public.plans (name, description, price, billing_period, features, max_catalog_items, max_intents, max_feeds) VALUES
  ('Free', 'Plano gratuito para começar', 0, 'monthly', '["10 itens no catálogo", "5 intenções", "2 feeds"]', 10, 5, 2),
  ('Pro', 'Plano profissional', 49.90, 'monthly', '["100 itens no catálogo", "50 intenções", "20 feeds", "Suporte prioritário"]', 100, 50, 20),
  ('Enterprise', 'Plano empresarial', 199.90, 'monthly', '["Itens ilimitados", "Intenções ilimitadas", "Feeds ilimitados", "Suporte 24/7", "API dedicada"]', NULL, NULL, NULL);

-- Inserir permissões básicas
INSERT INTO public.permissions (name, description, resource, action) VALUES
  ('catalog.create', 'Criar itens no catálogo', 'catalog', 'create'),
  ('catalog.read', 'Visualizar catálogo', 'catalog', 'read'),
  ('catalog.update', 'Editar itens do catálogo', 'catalog', 'update'),
  ('catalog.delete', 'Deletar itens do catálogo', 'catalog', 'delete'),
  ('intent.create', 'Criar intenções', 'intent', 'create'),
  ('intent.read', 'Visualizar intenções', 'intent', 'read'),
  ('intent.update', 'Editar intenções', 'intent', 'update'),
  ('intent.delete', 'Deletar intenções', 'intent', 'delete'),
  ('feed.create', 'Criar feeds', 'feed', 'create'),
  ('feed.read', 'Visualizar feeds', 'feed', 'read'),
  ('feed.update', 'Editar feeds', 'feed', 'update'),
  ('feed.delete', 'Deletar feeds', 'feed', 'delete'),
  ('admin.users', 'Gerenciar usuários', 'admin', 'manage'),
  ('admin.plans', 'Gerenciar planos', 'admin', 'manage'),
  ('admin.permissions', 'Gerenciar permissões', 'admin', 'manage');

-- Atribuir permissões aos roles
-- user: apenas leitura
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'user', id FROM public.permissions WHERE action = 'read';

-- admin: CRUD em catalog, intent, feed
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'admin', id FROM public.permissions WHERE resource IN ('catalog', 'intent', 'feed');

-- superadmin: todas as permissões
INSERT INTO public.role_permissions (role, permission_id)
SELECT 'superadmin', id FROM public.permissions;

-- =====================================================
-- FUNÇÕES AUXILIARES
-- =====================================================

-- Função para verificar se usuário tem permissão
CREATE OR REPLACE FUNCTION has_permission(user_id UUID, permission_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.user_profiles up
    JOIN public.role_permissions rp ON rp.role = up.role
    JOIN public.permissions p ON p.id = rp.permission_id
    WHERE up.id = user_id AND p.name = permission_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para promover usuário a superadmin (usar com cuidado!)
CREATE OR REPLACE FUNCTION promote_to_superadmin(user_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.user_profiles
  SET role = 'superadmin'
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- COMENTÁRIOS
-- =====================================================

COMMENT ON TABLE public.user_profiles IS 'Perfis de usuários com roles e planos';
COMMENT ON TABLE public.plans IS 'Planos de assinatura disponíveis';
COMMENT ON TABLE public.user_plan_history IS 'Histórico de mudanças de planos dos usuários';
COMMENT ON TABLE public.permissions IS 'Permissões granulares do sistema';
COMMENT ON TABLE public.role_permissions IS 'Associação entre roles e permissões';
COMMENT ON FUNCTION has_permission IS 'Verifica se um usuário tem uma permissão específica';
COMMENT ON FUNCTION promote_to_superadmin IS 'Promove um usuário a superadmin (usar apenas via SQL)';
