# Guía de Verificación - Netlify + Supabase

## ✅ Checklist de Verificación

### Paso 1: Verificar que el Deploy se Completó

1. Ve a tu sitio en Netlify Dashboard
2. Haz clic en la pestaña **"Deploys"**
3. Verifica que el último deploy tenga un ✅ (checkmark verde)
4. Si el deploy está en progreso, espera a que termine (1-2 minutos)

**Si el deploy falló:**
- Haz clic en el deploy fallido para ver los logs
- Busca errores relacionados con "Supabase" o "environment variables"
- Verifica que las variables estén correctamente escritas

---

### Paso 2: Trigger un Nuevo Deploy (si es necesario)

Si agregaste las variables después del último deploy, necesitas hacer un nuevo deploy:

1. En la pestaña **"Deploys"**
2. Haz clic en **"Trigger deploy"** → **"Deploy site"**
3. Espera a que termine

**O simplemente haz un pequeño cambio y push:**
- Esto activará el auto-deploy si lo tienes configurado

---

### Paso 3: Probar el Formulario

1. **Abre tu sitio desplegado** (la URL de Netlify, ej: `https://tu-sitio.netlify.app`)
2. Navega a la página de **inscripción** (`/inscripcion`)
3. Completa el formulario con datos de prueba:
   - Nombre completo: `Test Usuario`
   - Email: `test@ejemplo.com` (usa un email único cada vez)
   - Teléfono: `600000000` (9 dígitos, empezando con 6 o 7)
   - Diversidad funcional: Selecciona una opción
   - Relación: Selecciona una opción (ej: "Persona con diversidad funcional")
   - Marca el checkbox de consentimiento
   - Opcional: Marca newsletter si quieres
4. Haz clic en **"Enviar inscripción"**

**Resultado esperado:**
- Deberías ver un mensaje de éxito: "¡Inscripción enviada!"
- Después de 3 segundos, deberías ser redirigido a `/gracias-por-inscribirte`

---

### Paso 4: Verificar en Supabase

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto
3. En el menú lateral, haz clic en **"Table Editor"**
4. Selecciona la tabla **"registrations"**
5. Deberías ver el nuevo registro con los datos que ingresaste

**Si no ves el registro:**
- Verifica que el formulario se haya enviado correctamente
- Revisa los logs de Netlify (ver Paso 5)
- Verifica que la tabla `registrations` existe en Supabase

---

### Paso 5: Revisar Logs de Netlify (si hay problemas)

1. En Netlify, ve a **"Deploys"**
2. Selecciona el último deploy
3. Haz clic en **"Functions"** en la parte superior
4. Busca logs relacionados con `/api/submit-registration`
5. Los errores aparecerán ahí si algo falla

**Errores comunes:**

- **"Faltan las variables de entorno"**
  - Verifica que las variables estén en Site settings (no Team settings)
  - Verifica que los nombres sean exactos: `PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`

- **"Invalid API key"**
  - Verifica que hayas usado la **service_role** key, no la anon key
  - Copia nuevamente la key de Supabase

- **"relation 'registrations' does not exist"**
  - La tabla no existe en Supabase
  - Ejecuta nuevamente el script `supabase-schema.sql`

---

### Paso 6: Probar con Datos Reales (Opcional)

Una vez que todo funcione con datos de prueba, puedes probar con datos reales:

1. Completa el formulario con información real
2. Verifica que se guarde en Supabase
3. Verifica que no puedas duplicar el mismo email (debería dar error)

---

## ✅ Verificación Exitosa

Si todo funciona correctamente, deberías poder:

- ✅ Enviar el formulario sin errores
- ✅ Ver el mensaje de éxito
- ✅ Ver los datos guardados en Supabase Table Editor
- ✅ No poder duplicar el mismo email

---

## 🐛 Solución de Problemas Rápida

### El formulario no se envía
- Revisa la consola del navegador (F12 → Console)
- Verifica que la URL del sitio sea correcta
- Asegúrate de estar en la página `/inscripcion`

### Error 500 en el formulario
- Revisa los logs de Netlify Functions
- Verifica las variables de entorno
- Verifica que la tabla existe en Supabase

### Los datos no aparecen en Supabase
- Verifica que estés viendo la tabla correcta (`registrations`)
- Verifica que el formulario se haya enviado correctamente
- Revisa los logs de Netlify para ver si hay errores

### Variables de entorno no funcionan
- Asegúrate de estar en **Site settings**, no Team settings
- Verifica que los nombres sean exactos (case-sensitive)
- Haz un nuevo deploy después de agregar las variables

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Revisa los logs de Netlify (Deploys → Functions)
2. Verifica la consola del navegador (F12)
3. Verifica que las variables estén correctamente configuradas
4. Asegúrate de haber usado la service_role key de Supabase

