---
title: Configurando la sección de Publicaciones Destacadas
date: '2024-02-06T06:20:34+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Sección de Publicaciones Destacadas
weight: 150
aliases:
  - /posts/configuration/sections/featured-posts/
  - /docs/configuration/sections/featured-posts/
---

La sección de `Publicaciones Destacadas` sirve para mostrar las publicaciones que quieras. Para habilitar esta sección, crea un archivo `featured-posts.yaml` dentro del directorio `data/es/sections` e incluye el siguiente contenido:

```yaml
# Información de la sección
section:
  name: Publicaciones DestacadAS # Título de la sección
  id: featured-posts # id del url de la sección *se requiere*
  enable: true # Booleano que determina si la sección está activada (predeterminado: false)
  weight: 6 # Orden de la sección (predeterminado: alfabeticamente seguida del peso)
  showOnNavbar: true # Booleano que determina si el enlace de esta sección debe aparecer en la barra de navegación
  hideTitle: true # Opcionalmente puede ocultar el título del menú (predeterminado: false)

# publicaciones a destacar
posts:
  - quickstart
  - update-v3-to-v4
  - prepare-site
```
