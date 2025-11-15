# Guía de Configuración de Netlify con Supabase

## Paso 1: Obtener las Credenciales de Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Ve a **Settings** (⚙️) → **API**
3. Encontrarás dos valores importantes:

   **a) Project URL:**
   - Está en la sección "Project URL"
   - Ejemplo: `https://xxxxxxxxxxxxx.supabase.co`
   - **Copia este valor completo**

   **b) Service Role Key:**
   - Está en la sección "Project API keys"
   - Busca la clave que dice **"service_role"** (NO uses la "anon" key)
   - Haz clic en el icono de "eye" para revelarla
   - **Copia este valor completo** (es una cadena larga que empieza con `eyJ...`)

⚠️ **IMPORTANTE**: La service_role key tiene permisos completos. No la compartas ni la expongas públicamente.

---

## Paso 2: Configurar Variables de Entorno en Netlify

1. Ve a tu sitio en [Netlify Dashboard](https://app.netlify.com)
2. Selecciona tu sitio (si tienes varios, elige el correcto)
3. Ve a **Site settings** (en el menú superior)
4. En el menú lateral izquierdo, busca y haz clic en **Environment variables**
5. Haz clic en el botón **"Add a variable"** o **"Add variable"**

### Agregar Primera Variable: PUBLIC_SUPABASE_URL

- **Key**: `PUBLIC_SUPABASE_URL`
- **Value**: Pega la Project URL que copiaste de Supabase
  - Ejemplo: `https://xxxxxxxxxxxxx.supabase.co`
- **Scopes**: Deja marcado "All scopes" (o selecciona "Production", "Deploy previews", "Branch deploys" según necesites)
- Haz clic en **"Save"**

### Agregar Segunda Variable: SUPABASE_SERVICE_ROLE_KEY

- Haz clic nuevamente en **"Add a variable"**
- **Key**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: Pega la service_role key que copiaste de Supabase
  - Ejemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (cadena muy larga)
- **Scopes**: Deja marcado "All scopes"
- Haz clic en **"Save"**

### Verificar las Variables

Deberías ver ahora dos variables en la lista:
- ✅ `PUBLIC_SUPABASE_URL`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

---

## Paso 3: Hacer Deploy (si es necesario)

Si ya tienes el sitio desplegado:

1. Ve a **Deploys** en el menú superior
2. Haz clic en **"Trigger deploy"** → **"Deploy site"**
   - Esto redeployará el sitio con las nuevas variables de entorno

Si aún no has desplegado:

1. Los cambios se desplegarán automáticamente cuando hagas push al repositorio
2. O puedes hacer un deploy manual desde la pestaña **Deploys**

---

## Paso 4: Verificar que Funciona

1. Una vez que el deploy termine (verás un checkmark verde), ve a tu sitio
2. Navega a la página de inscripción
3. Completa el formulario con datos de prueba
4. Envía el formulario
5. Ve a Supabase → **Table Editor** → **registrations**
6. Deberías ver el nuevo registro guardado

---

## Solución de Problemas

### Error: "Faltan las variables de entorno de Supabase"

**Causa**: Las variables no están configuradas o tienen nombres incorrectos.

**Solución**:
- Verifica que los nombres sean exactamente:
  - `PUBLIC_SUPABASE_URL` (con guiones bajos, no guiones)
  - `SUPABASE_SERVICE_ROLE_KEY` (con guiones bajos, mayúsculas)
- Asegúrate de que los valores estén completos (sin espacios al inicio/final)
- Haz un nuevo deploy después de agregar las variables

### Error: "Invalid API key" o "JWT expired"

**Causa**: La service_role key es incorrecta o expiró.

**Solución**:
- Ve a Supabase → Settings → API
- Copia nuevamente la service_role key
- Actualiza la variable en Netlify
- Haz un nuevo deploy

### El formulario se envía pero no se guarda en Supabase

**Causa**: Puede ser un problema de permisos o la tabla no existe.

**Solución**:
- Verifica en Supabase que la tabla `registrations` existe
- Ve a Supabase → Table Editor → deberías ver la tabla `registrations`
- Si no existe, ejecuta nuevamente el script `supabase-schema.sql`
- Revisa los logs de Netlify (Deploys → selecciona el deploy → Functions logs)

### Ver los Logs de Netlify

1. Ve a **Deploys** → selecciona el último deploy
2. Haz clic en **"Functions"** en la parte superior
3. Busca logs relacionados con `/api/submit-registration`
4. Los errores aparecerán ahí si algo falla

---

## Checklist Final

- [ ] Variables de entorno configuradas en Netlify
- [ ] Deploy completado exitosamente
- [ ] Formulario de prueba enviado
- [ ] Datos visibles en Supabase Table Editor
- [ ] Sin errores en los logs de Netlify

---

## ¿Necesitas Ayuda?

Si encuentras algún problema:
1. Revisa los logs de Netlify (Deploys → Functions logs)
2. Verifica que las variables estén correctamente escritas
3. Asegúrate de haber usado la **service_role** key, no la **anon** key
4. Verifica que la tabla `registrations` existe en Supabase

