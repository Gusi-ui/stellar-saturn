# Guía para Verificar Supabase

## Paso 1: Verificar que la Tabla Existe

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto
3. En el menú lateral, haz clic en **"Table Editor"**
4. Deberías ver una lista de tablas en la parte izquierda
5. Busca la tabla **"registrations"**

**Si NO ves la tabla "registrations":**

1. Ve a **"SQL Editor"** en el menú lateral
2. Haz clic en **"New query"**
3. Copia y pega el contenido completo del archivo `supabase-schema.sql`
4. Haz clic en **"Run"** (o presiona Ctrl+Enter)
5. Deberías ver un mensaje de éxito
6. Vuelve a **"Table Editor"** y verifica que ahora aparece la tabla `registrations`

---

## Paso 2: Verificar la Estructura de la Tabla

Una vez que veas la tabla `registrations`, verifica que tenga estas columnas:

- ✅ `id` (UUID, Primary Key)
- ✅ `full_name` (text)
- ✅ `email` (text)
- ✅ `phone` (text)
- ✅ `functional_diversity` (text, nullable)
- ✅ `relationship` (text)
- ✅ `newsletter` (boolean)
- ✅ `consent` (boolean)
- ✅ `created_at` (timestamp)
- ✅ `updated_at` (timestamp)

---

## Paso 3: Verificar Row Level Security (RLS)

1. En **Table Editor**, selecciona la tabla `registrations`
2. Haz clic en el icono de **"..."** (tres puntos) junto al nombre de la tabla
3. Selecciona **"Edit RLS policies"**
4. Verifica que RLS esté **habilitado** (Enabled)

**Nota:** Con la service_role key, RLS no debería ser un problema, pero es bueno verificar.

---

## Paso 4: Probar Insertar un Registro Manualmente (Opcional)

Para verificar que la tabla funciona correctamente:

1. En **Table Editor** → tabla `registrations`
2. Haz clic en **"Insert row"** o el botón **"+"**
3. Completa los campos:
   - `full_name`: "Test Manual"
   - `email`: "test@manual.com"
   - `phone`: "600000000"
   - `relationship`: "person" (o cualquier valor válido)
   - `consent`: true (marca el checkbox)
   - `newsletter`: false (opcional)
4. Haz clic en **"Save"**
5. Deberías ver el nuevo registro en la tabla

Si esto funciona, la tabla está bien configurada y el problema está en otro lugar.

---

## Paso 5: Verificar las Credenciales de Supabase

1. Ve a **Settings** (⚙️) → **API**
2. Verifica que tengas:
   - **Project URL**: Debería ser algo como `https://xxxxx.supabase.co`
   - **service_role key**: Una cadena larga que empieza con `eyJ...`

**Importante:**

- Usa la **service_role** key, NO la **anon** key
- La service_role key tiene permisos completos y es la que necesitas para el servidor

---

## Problemas Comunes

### La tabla no existe

**Solución:** Ejecuta el script `supabase-schema.sql` en SQL Editor

### Error al insertar manualmente

**Solución:**

- Verifica que todos los campos requeridos estén completos
- Verifica que `relationship` tenga un valor válido: 'person', 'family', 'professional', o 'volunteer'
- Verifica que `consent` esté marcado como true

### No puedo ver la tabla

**Solución:**

- Verifica que estés en el proyecto correcto de Supabase
- Refresca la página
- Verifica que el script SQL se ejecutó correctamente

---

## Checklist de Verificación

- [ ] La tabla `registrations` existe en Table Editor
- [ ] La tabla tiene todas las columnas necesarias
- [ ] Puedo insertar un registro manualmente (opcional pero recomendado)
- [ ] Tengo la Project URL de Supabase
- [ ] Tengo la service_role key (no la anon key)
- [ ] Las variables están configuradas en Netlify con estos valores
