import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create a single supabase client for interacting with your database
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
})

// Helper functions with better error handling
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) {
      console.error('❌ SignUp error:', error)
      return { data: null, error }
    }
    
    console.log('✅ SignUp successful:', data.user?.email)
    
    // Set cookies for middleware if session exists
    if (data.session) {
      setSupabaseCookies(data.session.access_token, data.session.refresh_token)
    }
    
    return { data, error: null }
  } catch (err) {
    console.error('❌ SignUp exception:', err)
    return { data: null, error: err as Error }
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log('🔐 SignIn attempt:', { email, supabaseUrl })
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('❌ SignIn error:', {
        message: error.message,
        status: error.status,
        name: error.name,
      })
      return { data: null, error }
    }
    
    if (!data.session) {
      console.error('❌ No session created')
      return { data: null, error: new Error('No session created') }
    }
    
    console.log('✅ SignIn successful:', {
      email: data.user?.email,
      hasSession: !!data.session,
      hasAccessToken: !!data.session.access_token,
    })
    
    // Set cookies for middleware - use Supabase SSR format
    setSupabaseCookies(data.session.access_token, data.session.refresh_token)
    
    return { data, error: null }
  } catch (err) {
    console.error('❌ SignIn exception:', err)
    return { data: null, error: err as Error }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('❌ SignOut error:', error)
      return { error }
    }
    
    // Clear all Supabase cookies
    clearSupabaseCookies()
    
    console.log('✅ SignOut successful')
    return { error: null }
  } catch (err) {
    console.error('❌ SignOut exception:', err)
    return { error: err as Error }
  }
}

// Helper function to set Supabase cookies in the format expected by SSR
function setSupabaseCookies(accessToken: string, refreshToken: string) {
  // Format: base64({"access_token":"...","refresh_token":"...",...})
  const authData = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: 3600,
    token_type: 'bearer',
    user: null,
  }
  
  const base64Data = btoa(JSON.stringify(authData))
  
  // Set the main auth cookie that Supabase SSR expects
  const cookieName = `sb-${supabaseUrl.split('//')[1].split('.')[0]}-auth-token`
  document.cookie = `${cookieName}=${base64Data}; path=/; max-age=604800; SameSite=Lax; Secure`
  
  // Also set individual tokens for backwards compatibility
  document.cookie = `sb-access-token=${accessToken}; path=/; max-age=3600; SameSite=Lax; Secure`
  document.cookie = `sb-refresh-token=${refreshToken}; path=/; max-age=604800; SameSite=Lax; Secure`
  
  console.log('🍪 Cookies set:', { cookieName, hasAccessToken: !!accessToken, hasRefreshToken: !!refreshToken })
}

// Helper function to clear all Supabase cookies
function clearSupabaseCookies() {
  const cookieName = `sb-${supabaseUrl.split('//')[1].split('.')[0]}-auth-token`
  
  document.cookie = `${cookieName}=; path=/; max-age=0`
  document.cookie = 'sb-access-token=; path=/; max-age=0'
  document.cookie = 'sb-refresh-token=; path=/; max-age=0'
  
  console.log('🍪 Cookies cleared')
}

// Export createClient for compatibility
export { createSupabaseClient as createClient }
