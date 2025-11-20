-- =====================================================
-- SCRIPT PARA VERIFICAR E CRIAR ADMIN@LOQUIA.COM
-- =====================================================
-- Execute este script no Supabase SQL Editor
-- Projeto: xfvlvfoigbnipezxwmzt
-- =====================================================

-- PASSO 1: Verificar se o usuário existe em auth.users
SELECT 
  id, 
  email, 
  created_at,
  email_confirmed_at,
  last_sign_in_at
FROM auth.users 
WHERE email = 'admin@loquia.com';

-- PASSO 2: Verificar se o usuário existe em user_profiles
SELECT 
  id, 
  email, 
  role,
  full_name,
  is_active,
  created_at
FROM public.user_profiles 
WHERE email = 'admin@loquia.com';

-- =====================================================
-- SE O USUÁRIO NÃO EXISTE EM auth.users:
-- =====================================================
-- Você precisa criar via Supabase Dashboard:
-- 1. Vá em Authentication > Users > Add User
-- 2. Email: admin@loquia.com
-- 3. Password: [escolha uma senha segura]
-- 4. Auto Confirm User: ✅ MARQUE ESTA OPÇÃO
-- 5. Clique em Create User
--
-- Depois volte aqui e execute o PASSO 3
-- =====================================================

-- PASSO 3: Se usuário existe mas não tem role admin, atualizar
UPDATE public.user_profiles 
SET 
  role = 'admin',
  is_active = true
WHERE email = 'admin@loquia.com';

-- PASSO 4: Verificar se a atualização funcionou
SELECT 
  id, 
  email, 
  role,
  is_active,
  created_at,
  updated_at
FROM public.user_profiles 
WHERE email = 'admin@loquia.com';

-- =====================================================
-- SE O USUÁRIO EXISTE EM auth.users MAS NÃO EM user_profiles:
-- =====================================================
-- Isso significa que o trigger não funcionou
-- Execute este INSERT manualmente:

-- Primeiro, pegue o UUID do usuário:
-- SELECT id FROM auth.users WHERE email = 'admin@loquia.com';

-- Depois insira (substitua o UUID):
/*
INSERT INTO public.user_profiles (id, email, role, is_active)
VALUES (
  'COLE_O_UUID_AQUI',  -- UUID de auth.users
  'admin@loquia.com',
  'admin',
  true
);
*/

-- =====================================================
-- VERIFICAÇÃO FINAL
-- =====================================================

-- Listar todos os admins do sistema
SELECT 
  up.id, 
  up.email, 
  up.role,
  up.is_active,
  au.email_confirmed_at,
  au.last_sign_in_at
FROM public.user_profiles up
LEFT JOIN auth.users au ON au.id = up.id
WHERE up.role IN ('admin', 'superadmin')
ORDER BY up.created_at DESC;

-- =====================================================
-- RESETAR SENHA (SE NECESSÁRIO)
-- =====================================================
-- Se você esqueceu a senha do admin, pode resetar via Dashboard:
-- 1. Vá em Authentication > Users
-- 2. Encontre admin@loquia.com
-- 3. Clique nos 3 pontinhos > Send Password Reset Email
-- OU
-- 4. Clique nos 3 pontinhos > Reset Password (define nova senha diretamente)
