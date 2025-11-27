# Solución Error npm install

## 🐛 Error Actual

```
npm error code EEXIST
npm error syscall rename
npm error errno EEXIST
npm error Invalid response body while trying to fetch https://registry.npmjs.org/@netlify%2fdev:
EACCES: permission denied
```

## ✅ Soluciones (en orden de preferencia)

### Solución 1: Limpiar caché de npm (Recomendado)

```bash
# Limpiar completamente la caché de npm
sudo npm cache clean --force

# Luego instalar
npm install
```

### Solución 2: Eliminar archivo problemático específico

```bash
# Eliminar el archivo específico que causa el problema
sudo rm -f /Users/gusi/.npm/_cacache/content-v2/sha512/63/92/99abb7cb3f6beb625d85a6e228bb8e9b725b7b7a473230d90671c519e2218d21d2e08d5b260fc915a0138c95050acf643fa4c6f5206f13815521d9cdece7

# Luego instalar
npm install
```

### Solución 3: Corregir permisos de la carpeta npm (Más completo)

```bash
# Corregir permisos de toda la carpeta npm
sudo chown -R $(whoami) ~/.npm

# Limpiar caché
npm cache clean --force

# Instalar
npm install
```

### Solución 4: Reinstalación completa

```bash
# 1. Eliminar node_modules y lock files
rm -rf node_modules package-lock.json

# 2. Limpiar caché npm
sudo npm cache clean --force

# 3. Corregir permisos
sudo chown -R $(whoami) ~/.npm

# 4. Reinstalar todo
npm install
```

### Solución 5: Usar --force (Si todo lo demás falla)

```bash
# Forzar instalación (úsalo solo si las otras soluciones no funcionan)
npm install --force
```

---

## 🎯 Solución Rápida Recomendada

Ejecuta estos comandos en orden:

```bash
# Paso 1: Limpiar caché con permisos
sudo npm cache clean --force

# Paso 2: Corregir permisos de npm
sudo chown -R $(whoami) ~/.npm

# Paso 3: Reinstalar dependencias
npm install
```

---

## 🔍 ¿Por qué sucede esto?

Este error ocurre porque:

1. **Permisos incorrectos**: Archivos en `~/.npm` tienen permisos de root
2. **Caché corrupta**: La caché de npm tiene archivos duplicados o conflictivos
3. **Instalaciones previas con sudo**: Usar `sudo npm install` crea archivos con permisos incorrectos

---

## ⚠️ Importante: NO uses sudo npm install

**❌ MAL:**

```bash
sudo npm install  # NO HAGAS ESTO
```

**✅ BIEN:**

```bash
npm install  # Sin sudo
```

---

## 📝 Si nada funciona

Si después de intentar todas las soluciones sigues teniendo problemas:

### Opción A: Usar una versión previa del package.json

Las dependencias actuales funcionan perfectamente, solo actualiza cuando sea necesario:

```bash
# Revierte el package.json si quieres
git checkout HEAD~1 -- package.json

# Instala la versión anterior
npm install
```

### Opción B: Instalar dependencias manualmente una por una

```bash
# Instala las críticas primero
npm install astro@5.16.1
npm install @astrojs/react@latest
npm install react@latest react-dom@latest

# Luego el resto
npm install
```

---

## ✅ Verificación Final

Después de instalar correctamente, verifica:

```bash
# Ver versiones instaladas
npm list --depth=0

# Verificar que Astro funciona
npm run dev

# Verificar linting
npm run lint

# Verificar tipos
npm run type-check
```

---

## 🚀 Después de Solucionar

Una vez que `npm install` funcione:

1. Reinicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

2. El Hero debería verse perfectamente con:
   - ✅ Video de fondo funcionando
   - ✅ Sin espacio superior excesivo
   - ✅ Parallax suave
   - ✅ Dependencias actualizadas

---

## 💡 Consejo Pro

Para evitar este problema en el futuro:

1. **NUNCA uses `sudo npm install`** en proyectos locales
2. Mantén los permisos correctos: `sudo chown -R $(whoami) ~/.npm`
3. Limpia la caché periódicamente: `npm cache clean --force`
4. Considera usar **nvm** (Node Version Manager) para mejor gestión de permisos

---

## 📞 ¿Sigues teniendo problemas?

Si después de todo esto no funciona, comparte:

1. La salida completa del error
2. Tu versión de Node: `node --version`
3. Tu versión de npm: `npm --version`
4. Tu sistema operativo

¡Estamos aquí para ayudarte! 🎉
