import { createClient } from '@supabase/supabase-js';

// Función para obtener el cliente de Supabase
// Se crea de forma lazy para evitar errores en tiempo de build
function getSupabaseClient() {
  // Obtener las variables de entorno
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn(
      'Faltan las variables de entorno de Supabase. Asegúrate de configurarlas en Netlify Site settings → Environment variables'
    );
    return null;
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
// Evitamos exportar una instancia creada automáticamente para no romper el build si faltan env vars
export { getSupabaseClient };

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
