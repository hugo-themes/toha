---
title: Portada del blog
weight: 10
---

Ejecuta `mise run blog` para ver el ejemplo. Usa [exampleSites/blog/hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/blog/hugo.yaml), incluida la configuración de Tailwind. Elige la portada independientemente de la sección de contenido:

```yaml
params:
  home:
    layout: blog
    blog:
      hero:
        enable: true
        image: images/default-background.jpg
      topics:
        enable: true
        taxonomy: categories
        limit: 5
        postsPerTopic: 4
  features:
    blog:
      enable: true
      section: posts
      search:
        enable: true
    pagination:
      maxPostsPerPage: 4
```

Crea `content/posts/_index.md` y añade artículos en esa carpeta. La imagen principal y los temas se pueden desactivar por separado. La búsqueda es opcional y se limita al árbol y al idioma del blog. Los artículos y archivos conservan su diseño clásico.
