---
title: Configurando la sección de Publicaciones Recientes
date: '2020-06-08T06:20:34+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Sección de Publicaciones Recientes
weight: 150
aliases:
  - /posts/configuration/sections/recent-posts/
  - /docs/configuration/sections/recent-posts/
---

La sección de `Publicaciones Recientes` sirve para mostrar las últimas publicaciones de tu contenido. Para habilitar esta sección, crea un archivo `recent-posts.yaml` dentro del directorio `data/en/sections` e incluye el siguiente contenido:

```yaml
# Información de la sección
section:
  name: Publicaciones Recientes # Título de la sección
  id: recent-posts # id del url de la sección *se requiere*
  enable: true # Booleano que determina si la sección está activada (predeterminado: false)
  weight: 6 # Orden de la sección (predeterminado: alfabeticamente seguida del peso)
  showOnNavbar: true # Booleano que determina si el enlace de esta sección debe aparecer en la barra de navegación
  hideTitle: true # Opcionalmente puede ocultar el título del menú (predeterminado: false)
  numShow: 4 # Opcionalmente puede incrementar el número de publicaciones para mostrar (predeterminado: 3)
  showMoreButton: false # Opcionalmente puede mostrar el botón `Más publicaciones` (predeterminado: false)
```
