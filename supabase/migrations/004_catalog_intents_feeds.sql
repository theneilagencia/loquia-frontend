-- Catalog, Intents and Feeds Tables
-- Tabelas principais para funcionalidades do usuário

-- =====================================================
-- 1. TABELA: catalog
-- =====================================================
CREATE TABLE IF NOT EXISTS public.catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT,
  photo TEXT, -- URL da foto
  address TEXT,
  whatsapp TEXT,
  site TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_catalog_tenant ON public.catalog(tenant_id);
CREATE INDEX IF NOT EXISTS idx_catalog_category ON public.catalog(category);
CREATE INDEX IF NOT EXISTS idx_catalog_created ON public.catalog(created_at DESC);

-- RLS Policies
ALTER TABLE public.catalog ENABLE ROW LEVEL SECURITY;

-- Usuários podem ver apenas seus próprios itens
CREATE POLICY "Users can view own catalog items"
ON public.catalog FOR SELECT
TO authenticated
USING (tenant_id = auth.uid());

-- Usuários podem criar seus próprios itens
CREATE POLICY "Users can create own catalog items"
ON public.catalog FOR INSERT
TO authenticated
WITH CHECK (tenant_id = auth.uid());

-- Usuários podem atualizar seus próprios itens
CREATE POLICY "Users can update own catalog items"
ON public.catalog FOR UPDATE
TO authenticated
USING (tenant_id = auth.uid())
WITH CHECK (tenant_id = auth.uid());

-- Usuários podem deletar seus próprios itens
CREATE POLICY "Users can delete own catalog items"
ON public.catalog FOR DELETE
TO authenticated
USING (tenant_id = auth.uid());

-- =====================================================
-- 2. TABELA: intents
-- =====================================================
CREATE TABLE IF NOT EXISTS public.intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT[], -- Array de palavras-chave
  target_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_intents_tenant ON public.intents(tenant_id);
CREATE INDEX IF NOT EXISTS idx_intents_active ON public.intents(is_active);
CREATE INDEX IF NOT EXISTS idx_intents_created ON public.intents(created_at DESC);

-- RLS Policies
ALTER TABLE public.intents ENABLE ROW LEVEL SECURITY;

-- Usuários podem ver apenas suas próprias intenções
CREATE POLICY "Users can view own intents"
ON public.intents FOR SELECT
TO authenticated
USING (tenant_id = auth.uid());

-- Usuários podem criar suas próprias intenções
CREATE POLICY "Users can create own intents"
ON public.intents FOR INSERT
TO authenticated
WITH CHECK (tenant_id = auth.uid());

-- Usuários podem atualizar suas próprias intenções
CREATE POLICY "Users can update own intents"
ON public.intents FOR UPDATE
TO authenticated
USING (tenant_id = auth.uid())
WITH CHECK (tenant_id = auth.uid());

-- Usuários podem deletar suas próprias intenções
CREATE POLICY "Users can delete own intents"
ON public.intents FOR DELETE
TO authenticated
USING (tenant_id = auth.uid());

-- =====================================================
-- 3. TABELA: feeds
-- =====================================================
CREATE TABLE IF NOT EXISTS public.feeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL, -- Conteúdo do feed
  url TEXT, -- URL do feed
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_feeds_tenant ON public.feeds(tenant_id);
CREATE INDEX IF NOT EXISTS idx_feeds_active ON public.feeds(is_active);
CREATE INDEX IF NOT EXISTS idx_feeds_created ON public.feeds(created_at DESC);

-- RLS Policies
ALTER TABLE public.feeds ENABLE ROW LEVEL SECURITY;

-- Usuários podem ver apenas seus próprios feeds
CREATE POLICY "Users can view own feeds"
ON public.feeds FOR SELECT
TO authenticated
USING (tenant_id = auth.uid());

-- Usuários podem criar seus próprios feeds
CREATE POLICY "Users can create own feeds"
ON public.feeds FOR INSERT
TO authenticated
WITH CHECK (tenant_id = auth.uid());

-- Usuários podem atualizar seus próprios feeds
CREATE POLICY "Users can update own feeds"
ON public.feeds FOR UPDATE
TO authenticated
USING (tenant_id = auth.uid())
WITH CHECK (tenant_id = auth.uid());

-- Usuários podem deletar seus próprios feeds
CREATE POLICY "Users can delete own feeds"
ON public.feeds FOR DELETE
TO authenticated
USING (tenant_id = auth.uid());

-- =====================================================
-- COMENTÁRIOS
-- =====================================================
COMMENT ON TABLE public.catalog IS 'Catálogo de produtos/serviços do usuário';
COMMENT ON TABLE public.intents IS 'Intenções de busca configuradas pelo usuário';
COMMENT ON TABLE public.feeds IS 'Feeds de conteúdo para IAs consumirem';
