'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/hooks/useAuth';

interface RequireRoleProps {
  children: React.ReactNode;
  role: UserRole | UserRole[];
  fallbackUrl?: string;
}

export default function RequireRole({ 
  children, 
  role, 
  fallbackUrl = '/dashboard' 
}: RequireRoleProps) {
  const router = useRouter();
  const { profile, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (loading) return;

    // Se não estiver autenticado, redirecionar para login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Se não tiver perfil carregado, aguardar
    if (!profile) return;

    // Verificar se o usuário tem o role necessário
    const requiredRoles = Array.isArray(role) ? role : [role];
    const hasRequiredRole = requiredRoles.includes(profile.role);

    if (!hasRequiredRole) {
      console.warn(`⚠️ Access denied: User has role "${profile.role}", but requires one of: ${requiredRoles.join(', ')}`);
      router.push(fallbackUrl);
    }
  }, [loading, isAuthenticated, profile, role, router, fallbackUrl]);

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  // Não mostrar nada se não estiver autenticado ou não tiver role correto
  if (!isAuthenticated || !profile) {
    return null;
  }

  const requiredRoles = Array.isArray(role) ? role : [role];
  const hasRequiredRole = requiredRoles.includes(profile.role);

  if (!hasRequiredRole) {
    return null;
  }

  // Usuário tem permissão, mostrar conteúdo
  return <>{children}</>;
}
