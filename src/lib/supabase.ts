import { createClient } from '@supabase/supabase-js';

// Obtener las variables de entorno
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Faltan las variables de entorno de Supabase. ' +
    'Asegúrate de configurar PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY'
  );
}

// Crear cliente de Supabase con service_role key para operaciones del servidor
// El service_role key tiene permisos completos y solo debe usarse en el servidor
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

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

