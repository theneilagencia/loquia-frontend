import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export type UserRole = 'user' | 'admin' | 'superadmin';

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  role: UserRole;
  plan_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    isAuthenticated: false,
    isSuperAdmin: false,
    isAdmin: false,
  });

  useEffect(() => {
    // Carregar usuário inicial
    loadUser();

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state changed:', event);
        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          setState({
            user: null,
            profile: null,
            loading: false,
            isAuthenticated: false,
            isSuperAdmin: false,
            isAdmin: false,
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function loadUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await loadUserProfile(user);
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error('❌ Error loading user:', error);
      setState(prev => ({ ...prev, loading: false }));
    }
  }

  async function loadUserProfile(user: User) {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('❌ Error loading profile:', error);
        setState({
          user,
          profile: null,
          loading: false,
          isAuthenticated: true,
          isSuperAdmin: false,
          isAdmin: false,
        });
        return;
      }

      setState({
        user,
        profile: profile as UserProfile,
        loading: false,
        isAuthenticated: true,
        isSuperAdmin: profile.role === 'superadmin',
        isAdmin: profile.role === 'admin' || profile.role === 'superadmin',
      });
    } catch (error) {
      console.error('❌ Error loading profile:', error);
      setState({
        user,
        profile: null,
        loading: false,
        isAuthenticated: true,
        isSuperAdmin: false,
        isAdmin: false,
      });
    }
  }

  async function hasPermission(permissionName: string): Promise<boolean> {
    if (!state.user) return false;

    try {
      const { data, error } = await supabase.rpc('has_permission', {
        user_id: state.user.id,
        permission_name: permissionName,
      });

      if (error) {
        console.error('❌ Error checking permission:', error);
        return false;
      }

      return data === true;
    } catch (error) {
      console.error('❌ Error checking permission:', error);
      return false;
    }
  }

  async function refreshProfile() {
    if (state.user) {
      await loadUserProfile(state.user);
    }
  }

  return {
    ...state,
    hasPermission,
    refreshProfile,
  };
}
