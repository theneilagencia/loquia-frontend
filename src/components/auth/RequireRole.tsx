'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export type UserRole = 'user' | 'admin' | 'superadmin';

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
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  async function checkPermissions() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Se não estiver autenticado, redirecionar para login
      if (!user) {
        router.push('/login');
        return;
      }

      // Verificar role por email (temporário até RLS ser corrigido)
      const requiredRoles = Array.isArray(role) ? role : [role];
      const adminEmails = ['admin@loquia.com'];
      
      let userRole: UserRole = 'user';
      if (user.email && adminEmails.includes(user.email)) {
        userRole = 'superadmin';
      }

      const hasRequiredRole = requiredRoles.includes(userRole);

      if (!hasRequiredRole) {
        console.warn(`Access denied: User has role "${userRole}", but requires one of: ${requiredRoles.join(', ')}`);
        router.push(fallbackUrl);
        return;
      }

      setHasPermission(true);
    } catch (error) {
      console.error('Error checking permissions:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  // Não mostrar nada se não tiver permissão
  if (!hasPermission) {
    return null;
  }

  // Usuário tem permissão, mostrar conteúdo
  return <>{children}</>;
}
