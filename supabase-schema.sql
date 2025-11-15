-- Esquema de base de datos para registros de inscripción
-- Ejecutar este script en el SQL Editor de Supabase

-- Crear tabla de registros
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  functional_diversity TEXT CHECK (functional_diversity IN ('visual', 'auditory', 'motor', 'cognitive', 'other', 'none')),
  relationship TEXT NOT NULL CHECK (relationship IN ('person', 'family', 'professional', 'volunteer')),
  newsletter BOOLEAN DEFAULT false,
  consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Crear índice para búsquedas por fecha
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Política: Permitir inserción desde el API (usando service_role key)
-- Nota: Esto se maneja mediante el service_role key en el código del servidor
-- No necesitamos políticas públicas ya que el acceso es solo desde el servidor

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_registrations_updated_at 
    BEFORE UPDATE ON registrations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Comentarios para documentación
COMMENT ON TABLE registrations IS 'Almacena las inscripciones de nuevos miembros de la asociación';
COMMENT ON COLUMN registrations.full_name IS 'Nombre completo del solicitante';
COMMENT ON COLUMN registrations.email IS 'Correo electrónico del solicitante';
COMMENT ON COLUMN registrations.phone IS 'Teléfono de contacto (WhatsApp)';
COMMENT ON COLUMN registrations.functional_diversity IS 'Tipo de diversidad funcional';
COMMENT ON COLUMN registrations.relationship IS 'Relación con la asociación';
COMMENT ON COLUMN registrations.newsletter IS 'Consentimiento para recibir newsletter';
COMMENT ON COLUMN registrations.consent IS 'Consentimiento para tratamiento de datos';

