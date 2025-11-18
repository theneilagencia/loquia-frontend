import { supabase } from '@/lib/supabase';
import { UserProfile, UserRole } from '@/hooks/useAuth';

export interface CreateUserData {
  email: string;
  password: string;
  full_name?: string;
  role?: UserRole;
  plan_id?: string;
}

export interface UpdateUserData {
  full_name?: string;
  role?: UserRole;
  plan_id?: string;
  is_active?: boolean;
}

/**
 * Listar todos os usuários (apenas superadmin)
 */
export async function listUsers() {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error listing users:', error);
    throw error;
  }

  return data;
}

/**
 * Buscar usuário por ID
 */
export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('❌ Error getting user:', error);
    throw error;
  }

  return data;
}

/**
 * Criar novo usuário (apenas superadmin)
 * NOTA: Requer Admin API do Supabase
 */
export async function createUser(userData: CreateUserData) {
  // Criar usuário via Auth Admin API
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: userData.email,
    password: userData.password,
    email_confirm: true,
  });

  if (authError) {
    console.error('❌ Error creating auth user:', authError);
    throw authError;
  }

  // Atualizar perfil com dados adicionais
  const { data: profileData, error: profileError } = await supabase
    .from('user_profiles')
    .update({
      full_name: userData.full_name,
      role: userData.role || 'user',
      plan_id: userData.plan_id,
    })
    .eq('id', authData.user.id)
    .select()
    .single();

  if (profileError) {
    console.error('❌ Error updating user profile:', profileError);
    throw profileError;
  }

  return profileData;
}

/**
 * Atualizar usuário (apenas superadmin)
 */
export async function updateUser(userId: string, userData: UpdateUserData) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(userData)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('❌ Error updating user:', error);
    throw error;
  }

  return data;
}

/**
 * Deletar usuário (apenas superadmin)
 */
export async function deleteUser(userId: string) {
  // Deletar via Auth Admin API
  const { error: authError } = await supabase.auth.admin.deleteUser(userId);

  if (authError) {
    console.error('❌ Error deleting auth user:', authError);
    throw authError;
  }

  // O perfil será deletado automaticamente via CASCADE
  return true;
}

/**
 * Ativar/Desativar usuário
 */
export async function toggleUserStatus(userId: string, isActive: boolean) {
  return updateUser(userId, { is_active: isActive });
}

/**
 * Mudar role do usuário
 */
export async function changeUserRole(userId: string, role: UserRole) {
  return updateUser(userId, { role });
}

/**
 * Atribuir plano ao usuário
 */
export async function assignPlanToUser(userId: string, planId: string) {
  // Atualizar perfil
  const profile = await updateUser(userId, { plan_id: planId });

  // Registrar no histórico
  const { error: historyError } = await supabase
    .from('user_plan_history')
    .insert({
      user_id: userId,
      plan_id: planId,
      started_at: new Date().toISOString(),
    });

  if (historyError) {
    console.error('❌ Error creating plan history:', historyError);
  }

  return profile;
}

/**
 * Buscar histórico de planos do usuário
 */
export async function getUserPlanHistory(userId: string) {
  const { data, error } = await supabase
    .from('user_plan_history')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false });

  if (error) {
    console.error('❌ Error getting plan history:', error);
    throw error;
  }

  return data;
}

/**
 * Buscar estatísticas de usuários
 */
export async function getUserStats() {
  const { count: totalUsers, error: totalError } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true });

  const { count: activeUsers, error: activeError } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  const { count: superAdmins, error: superError } = await supabase
    .from('user_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'superadmin');

  if (totalError || activeError || superError) {
    console.error('❌ Error getting user stats');
    throw totalError || activeError || superError;
  }

  return {
    total: totalUsers || 0,
    active: activeUsers || 0,
    superadmins: superAdmins || 0,
  };
}
