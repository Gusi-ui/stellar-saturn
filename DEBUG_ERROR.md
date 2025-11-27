# Guía de Debug - Error al Enviar Formulario

## 🔍 Pasos para Diagnosticar el Error

### Paso 1: Revisar Logs de Netlify Functions

1. Ve a tu sitio en [Netlify Dashboard](https://app.netlify.com)
2. Haz clic en la pestaña **"Deploys"**
3. Selecciona el **último deploy** (el más reciente)
4. Haz clic en **"Functions"** en la parte superior
5. Busca logs relacionados con `/api/submit-registration`
6. **Copia el error completo** que aparezca ahí

Los errores más comunes que verás:

#### Error: "Faltan las variables de entorno de Supabase"

```
Error: Faltan las variables de entorno de Supabase.
Asegúrate de configurar PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY
```

**Solución:**

- Verifica que las variables estén en **Site settings** → **Environment variables**
- Verifica que los nombres sean exactos:
  - `PUBLIC_SUPABASE_URL` (con guiones bajos, mayúsculas)
  - `SUPABASE_SERVICE_ROLE_KEY` (con guiones bajos, mayúsculas)
- Haz un nuevo deploy después de agregar las variables

#### Error: "Invalid API key" o "JWT expired"

```
Error: Invalid API key
```

**Solución:**

- Ve a Supabase → Settings → API
- Copia nuevamente la **service_role** key (NO la anon key)
- Actualiza la variable `SUPABASE_SERVICE_ROLE_KEY` en Netlify
- Haz un nuevo deploy

#### Error: "relation 'registrations' does not exist"

```
Error: relation "registrations" does not exist
```

**Solución:**

- Ve a Supabase → SQL Editor
- Ejecuta nuevamente el script `supabase-schema.sql`
- Verifica que la tabla existe: Table Editor → deberías ver `registrations`

#### Error: "new row violates row-level security policy"

```
Error: new row violates row-level security policy
```

**Solución:**

- Esto no debería pasar con service_role key, pero si ocurre:
- Ve a Supabase → Table Editor → registrations
- Haz clic en "..." → "Edit RLS policies"
- Verifica que las políticas estén configuradas correctamente

---

### Paso 2: Verificar Variables de Entorno

1. En Netlify → **Site settings** → **Environment variables**
2. Verifica que veas estas dos variables:
   - ✅ `PUBLIC_SUPABASE_URL`
   - ✅ `SUPABASE_SERVICE_ROLE_KEY`
3. Verifica que los valores estén completos (sin espacios al inicio/final)
4. Verifica que estés usando la **service_role** key, no la anon key

**Para verificar la service_role key:**

- En Supabase → Settings → API
- Busca la sección "Project API keys"
- Deberías ver dos keys: "anon" y "service_role"
- Usa la **service_role** (es más larga y tiene permisos completos)

---

### Paso 3: Verificar que la Tabla Existe

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a **"Table Editor"**
4. Verifica que veas la tabla **"registrations"**
5. Si no existe, ejecuta el script `supabase-schema.sql` nuevamente

---

### Paso 4: Probar con cURL (Opcional - Para desarrolladores)

Si quieres probar el endpoint directamente:

```bash
curl -X POST https://tu-sitio.netlify.app/api/submit-registration \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Usuario",
    "email": "test@ejemplo.com",
    "phone": "600000000",
    "functionalDiversity": "none",
    "relationship": "person",
    "consent": true,
    "newsletter": false
  }'
```

Esto te mostrará el error exacto en la respuesta.

---

### Paso 5: Verificar Consola del Navegador

1. Abre tu sitio
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña **"Console"**
4. Intenta enviar el formulario nuevamente
5. Busca errores en la consola

---

## 🛠️ Soluciones Rápidas

### Solución 1: Verificar Variables de Entorno

```bash
# En Netlify, verifica:
PUBLIC_SUPABASE_URL = https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Solución 2: Hacer Nuevo Deploy

Después de agregar o modificar variables:

1. Ve a Deploys → Trigger deploy → Deploy site
2. Espera a que termine
3. Prueba nuevamente

### Solución 3: Verificar Supabase

1. Verifica que la tabla `registrations` existe
2. Verifica que tienes la service_role key correcta
3. Verifica que el proyecto esté activo en Supabase

---

## 📋 Información que Necesito para Ayudarte

Si el problema persiste, comparte:

1. **El error exacto de los logs de Netlify Functions**
2. **Screenshot de las variables de entorno en Netlify** (oculta los valores)
3. **Confirmación de que la tabla `registrations` existe en Supabase**
4. **El error de la consola del navegador** (si hay alguno)

---

## 🔄 Próximos Pasos

1. Revisa los logs de Netlify Functions (Paso 1)
2. Copia el error exacto
3. Compártelo conmigo para ayudarte a solucionarlo
