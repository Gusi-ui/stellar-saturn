# 🌳 Git Workflow - Flujo de Trabajo

## 📋 Estructura de Ramas

Este proyecto utiliza **Git Flow**, un modelo de branching profesional para desarrollo colaborativo.

```
main (producción)
  └── develop (desarrollo)
       ├── feature/improve-navigation-hero (feature actual)
       ├── feature/nueva-funcionalidad
       └── hotfix/bug-critico (si es necesario)
```

---

## 🎯 Ramas Principales

### `main` - Producción

- **Propósito:** Código en producción
- **Deploys:** Automático a Netlify
- **Protección:** Solo merge desde `develop` o `hotfix`
- **Estado:** Siempre estable y funcional

### `develop` - Desarrollo

- **Propósito:** Integración de features
- **Testing:** Pruebas antes de merge a `main`
- **Protección:** Solo merge desde `feature` branches
- **Estado:** Relativamente estable

---

## 🔧 Ramas de Trabajo

### `feature/*` - Nuevas Funcionalidades

- **Creación:** Desde `develop`
- **Nomenclatura:** `feature/nombre-descriptivo`
- **Merge:** A `develop` (via Pull Request)
- **Eliminación:** Después del merge

**Ejemplos:**

```bash
feature/improve-navigation-hero
feature/add-contact-form
feature/blog-pagination
```

### `hotfix/*` - Correcciones Urgentes

- **Creación:** Desde `main`
- **Nomenclatura:** `hotfix/nombre-del-bug`
- **Merge:** A `main` Y `develop`
- **Uso:** Solo para bugs críticos en producción

**Ejemplos:**

```bash
hotfix/fix-form-submission
hotfix/broken-navigation
```

---

## 📝 Flujo de Trabajo Completo

### 1. Crear Feature Branch

```bash
# Asegurarse de estar en develop actualizado
git checkout develop
git pull origin develop

# Crear nueva rama de feature
git checkout -b feature/nombre-feature
```

### 2. Trabajar en la Feature

```bash
# Hacer cambios
# Los pre-commit hooks validarán automáticamente

git add .
git commit -m "feat: Descripción del cambio"

# Commits adicionales según sea necesario
git commit -m "fix: Corrección menor"
git commit -m "docs: Actualizar documentación"
```

### 3. Pushear Feature Branch

```bash
# Primera vez
git push -u origin feature/nombre-feature

# Pushes subsecuentes
git push
```

### 4. Merge a Develop

```bash
# Opción A: Merge directo (desarrollo solo)
git checkout develop
git merge feature/nombre-feature
git push origin develop

# Opción B: Pull Request en GitHub (recomendado)
# Crear PR desde feature/nombre-feature hacia develop
# Revisar cambios
# Aprobar y merge
```

### 5. Testing en Develop

```bash
# Verificar que todo funciona en develop
npm run dev
npm run validate

# Si hay problemas, corregir en feature branch
# Si todo está bien, proceder a main
```

### 6. Merge a Main (Producción)

```bash
git checkout main
git merge develop
git push origin main

# Netlify desplegará automáticamente
```

### 7. Limpieza

```bash
# Eliminar feature branch local
git branch -d feature/nombre-feature

# Eliminar feature branch remoto
git push origin --delete feature/nombre-feature
```

---

## 🚀 Estado Actual del Proyecto

### Ramas Existentes

| Rama                              | Propósito                                 | Estado        |
| --------------------------------- | ----------------------------------------- | ------------- |
| `main`                            | Producción (Netlify)                      | ✅ Activa     |
| `develop`                         | Desarrollo e integración                  | ✅ Activa     |
| `feature/improve-navigation-hero` | Mejoras navegación y hero (tú estás aquí) | 🔨 Trabajando |

### Último Commit en Cada Rama

```
main:    da812c1 - chore: Cambiar formato de imagen de tarjeta de WebP a AVIF
develop: da812c1 - chore: Cambiar formato de imagen de tarjeta de WebP a AVIF
feature/improve-navigation-hero: da812c1 - (inicio desde develop)
```

---

## ✅ Convenciones de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

### Tipos de Commits

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formateo, espacios, etc (no afecta código)
- `refactor:` Refactorización de código
- `perf:` Mejoras de performance
- `test:` Añadir o actualizar tests
- `chore:` Tareas de mantenimiento
- `ci:` Cambios en CI/CD

### Ejemplos

```bash
git commit -m "feat: Añadir animación al botón de contacto"
git commit -m "fix: Corregir espaciado en navegación móvil"
git commit -m "docs: Actualizar README con instrucciones"
git commit -m "refactor: Simplificar lógica de HeroSection"
git commit -m "perf: Optimizar carga de imágenes con lazy loading"
```

---

## 🔄 Comandos Útiles

### Ver Ramas

```bash
# Ramas locales
git branch

# Ramas locales y remotas
git branch -a

# Ramas con último commit
git branch -vv
```

### Cambiar de Rama

```bash
# Cambiar a rama existente
git checkout develop
git checkout main

# Crear y cambiar a nueva rama
git checkout -b feature/nueva-feature
```

### Actualizar Rama

```bash
# Obtener cambios del remoto
git fetch origin

# Actualizar rama actual
git pull

# Actualizar develop desde main
git checkout develop
git merge main
```

### Sincronizar con Remoto

```bash
# Ver estado de sincronización
git status

# Pushear cambios
git push

# Pushear nueva rama
git push -u origin nombre-rama
```

---

## 🎯 Flujo Específico para `feature/improve-navigation-hero`

### Estado Actual

```
✅ Rama creada desde develop
✅ Listo para trabajar
📝 Pendiente: Implementar mejoras
```

### Próximos Pasos

1. **Implementar mejoras** en Navigation y Hero
2. **Commit frecuente** con mensajes descriptivos
3. **Probar localmente** (`npm run dev`)
4. **Validar código** (automático en pre-commit)
5. **Push a feature branch** (`git push`)
6. **Merge a develop** cuando esté listo
7. **Probar en develop**
8. **Merge a main** para producción

---

## 🛡️ Protecciones y Validaciones

### Pre-commit Hooks

Antes de cada commit, automáticamente se ejecutan:

- ✅ ESLint (análisis de código)
- ✅ Prettier (formateo)
- ✅ TypeScript check (validación de tipos)

### Pre-push (Futuro)

Podemos añadir:

- 🔄 Tests unitarios
- 🔄 Build test
- 🔄 Lighthouse CI

---

## 📊 Visualización del Flujo

```
┌─────────────────────────────────────────────────────────┐
│                     MAIN (Producción)                   │
│              ← Solo merges desde develop                │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ merge cuando develop está estable
                       │
┌──────────────────────▼──────────────────────────────────┐
│                    DEVELOP                               │
│         ← Integración de features                       │
└──────┬───────────────┬───────────────┬──────────────────┘
       │               │               │
       │ merge         │ merge         │ merge
       │               │               │
┌──────▼─────┐  ┌──────▼─────┐  ┌──────▼─────┐
│ feature/A  │  │ feature/B  │  │ feature/C  │
│ (tú aquí)  │  │            │  │            │
└────────────┘  └────────────┘  └────────────┘
```

---

## 🚨 Resolución de Conflictos

### Si hay Conflictos al Merge

```bash
# Intentar merge
git merge develop

# Si hay conflictos:
# 1. Git te mostrará los archivos con conflictos
# 2. Abre cada archivo y busca:
#    <<<<<<< HEAD
#    tu código
#    =======
#    código de develop
#    >>>>>>> develop

# 3. Resuelve manualmente cada conflicto
# 4. Guarda los archivos

# 5. Añade los archivos resueltos
git add archivo-resuelto.astro

# 6. Completa el merge
git commit -m "merge: Resolver conflictos con develop"
```

---

## 💡 Mejores Prácticas

### ✅ Hacer

- Commits pequeños y frecuentes
- Mensajes descriptivos siguiendo convenciones
- Probar localmente antes de push
- Mantener develop actualizado
- Eliminar feature branches después de merge
- Documentar cambios importantes

### ❌ Evitar

- Commits gigantes con muchos cambios
- Mensajes vagos ("fix", "update", "changes")
- Push sin probar localmente
- Trabajar directamente en main o develop
- Dejar feature branches sin merge
- Force push a ramas compartidas

---

## 📚 Recursos

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Pro Git Book](https://git-scm.com/book/es/v2)

---

## 🎉 Resumen

**Ahora estás trabajando en:**

```bash
feature/improve-navigation-hero
```

**Comandos frecuentes:**

```bash
# Ver estado
git status

# Commit
git add .
git commit -m "feat: Descripción"

# Push
git push

# Volver a develop
git checkout develop

# Ver todas las ramas
git branch -a
```

---

**¡Listo para trabajar con Git Flow profesional!** 🚀
