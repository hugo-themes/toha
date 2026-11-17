---
title: Secciones y navegación
weight: 20
---

Usa las secciones de Hugo como jerarquía. Una carpeta con `_index.md` es un bundle de rama y puede contener páginas y subsecciones. `index.md` crea un bundle hoja: guarda allí un artículo y sus imágenes, sin páginas hijas.

```text
content/docs/
  _index.md
  portfolio/
    _index.md
    sections/
      _index.md
      about/
        index.md
        images/about.png
  blog/
    _index.md
  documentation/
    _index.md
  shortcodes/
    _index.md
  customization/
    _index.md
```

Define `title`, opcionalmente `linkTitle`, y `weight` en cada sección. La raíz transmite `type: docs` mediante `cascade`. Activa `params.features.docs.sidebar.groupSections: true` para mostrar las secciones principales como encabezados. La opción está desactivada por defecto; las subsecciones siguen siendo desplegables.

Las rutas de navegación, la búsqueda y los enlaces anterior/siguiente siguen el mismo árbol. Usa `relref` con rutas lógicas. Añade `aliases` cuando muevas páginas; Hugo añade el prefijo de idioma. Las secciones de contenido son distintas de las secciones del portfolio definidas en datos.

[Hugo](https://gohugo.io/content-management/organization/#sections)
