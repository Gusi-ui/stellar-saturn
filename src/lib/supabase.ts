import { createClient } from '@supabase/supabase-js';

// Función para obtener el cliente de Supabase
// Se crea de forma lazy para evitar errores en tiempo de build
function getSupabaseClient() {
  // Obtener las variables de entorno
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    const missingVars = [];
    if (!supabaseUrl) missingVars.push('PUBLIC_SUPABASE_URL');
    if (!supabaseServiceKey) missingVars.push('SUPABASE_SERVICE_ROLE_KEY');

    throw new Error(
      `Faltan las variables de entorno de Supabase: ${missingVars.join(', ')}. ` +
        'Asegúrate de configurarlas en Netlify Site settings → Environment variables'
    );
  }

  // Crear cliente de Supabase con service_role key para operaciones del servidor
  // El service_role key tiene permisos completos y solo debe usarse en el servidor
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Exportar función para obtener el cliente (lazy initialization)
export const supabase = getSupabaseClient();

// Tipo para los datos de registro
export interface RegistrationData {
  full_name: string;
  email: string;
  phone: string;
  functional_diversity?: string;
  relationship: string;
  newsletter?: boolean;
  consent: boolean;
}
