import { supabase } from '@/lib/supabase';

export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  billing_period: 'monthly' | 'yearly' | 'lifetime';
  features: string[];
  max_catalog_items?: number;
  max_intents?: number;
  max_feeds?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePlanData {
  name: string;
  description?: string;
  price: number;
  billing_period: 'monthly' | 'yearly' | 'lifetime';
  features: string[];
  max_catalog_items?: number;
  max_intents?: number;
  max_feeds?: number;
  is_active?: boolean;
}

export interface UpdatePlanData extends Partial<CreatePlanData> {}

/**
 * Listar todos os planos
 */
export async function listPlans(activeOnly = false) {
  let query = supabase
    .from('plans')
    .select('*')
    .order('price', { ascending: true });

  if (activeOnly) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('❌ Error listing plans:', error);
    throw error;
  }

  return data as Plan[];
}

/**
 * Buscar plano por ID
 */
export async function getPlanById(planId: string) {
  const { data, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', planId)
    .single();

  if (error) {
    console.error('❌ Error getting plan:', error);
    throw error;
  }

  return data as Plan;
}

/**
 * Criar novo plano (apenas superadmin)
 */
export async function createPlan(planData: CreatePlanData) {
  const { data, error } = await supabase
    .from('plans')
    .insert({
      ...planData,
      is_active: planData.is_active ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error('❌ Error creating plan:', error);
    throw error;
  }

  return data as Plan;
}

/**
 * Atualizar plano (apenas superadmin)
 */
export async function updatePlan(planId: string, planData: UpdatePlanData) {
  const { data, error } = await supabase
    .from('plans')
    .update(planData)
    .eq('id', planId)
    .select()
    .single();

  if (error) {
    console.error('❌ Error updating plan:', error);
    throw error;
  }

  return data as Plan;
}

/**
 * Deletar plano (apenas superadmin)
 */
export async function deletePlan(planId: string) {
  const { error } = await supabase
    .from('plans')
    .delete()
    .eq('id', planId);

  if (error) {
    console.error('❌ Error deleting plan:', error);
    throw error;
  }

  return true;
}

/**
 * Ativar/Desativar plano
 */
export async function togglePlanStatus(planId: string, isActive: boolean) {
  return updatePlan(planId, { is_active: isActive });
}

/**
 * Buscar usuários de um plano
 */
export async function getPlanUsers(planId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('id, email, full_name, created_at')
    .eq('plan_id', planId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error getting plan users:', error);
    throw error;
  }

  return data;
}

/**
 * Buscar estatísticas de planos
 */
export async function getPlanStats() {
  const { data: plans, error } = await supabase
    .from('plans')
    .select(`
      id,
      name,
      price,
      is_active
    `);

  if (error) {
    console.error('❌ Error getting plan stats:', error);
    throw error;
  }

  // Contar usuários por plano
  const statsPromises = plans.map(async (plan) => {
    const { count } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true })
      .eq('plan_id', plan.id);

    return {
      ...plan,
      user_count: count || 0,
    };
  });

  const stats = await Promise.all(statsPromises);

  return stats;
}
